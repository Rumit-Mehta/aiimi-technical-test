from pathlib import Path
import re
from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, create_engine, UniqueConstraint, or_, and_
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import IntegrityError
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware


# Initialise db 
BASE_DIR = Path(__file__).resolve().parent  # backend/
DB_PATH = BASE_DIR / "users.db"
DB_URL = f"sqlite:///{DB_PATH}"
engine = create_engine(DB_URL, connect_args={"check_same_thread": False})
Session = sessionmaker(bind=engine)
Base = declarative_base()

# Creating User table
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    first_name = Column(String(80), index=True, nullable=False)
    last_name = Column(String(80), index=True, nullable=False)
    job_title = Column(String(120), nullable=False)
    phone = Column(String(30), nullable=False)
    email = Column(String(254), unique=True, index=True, nullable=False)
    __table_args__ = (UniqueConstraint("first_name", "last_name"),)  # prevent duplicate names

Base.metadata.create_all(engine)

class UserIn(BaseModel):
    first_name: str
    last_name: str
    job_title: str
    phone: str
    email: EmailStr



#  - - API Endpoints - - 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users")
def search_users(name: str = Query("", alias="q")):
    
    # Spec: only suggest after 2 chars
    if len(name.strip()) < 2:
        return []

    db = Session()
    results = db.query(User).filter(
        or_(
            User.first_name.ilike(f"%{name}%"),
            User.last_name.ilike(f"%{name}%"),
        )
    ).all()
    db.close()
    return results


@app.get("/users/{uid}")
def get_user(uid: int):
    db = Session()
    user = db.query(User).get(uid)
    db.close()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", status_code=201)
def create_user(user: UserIn):
    payload = user.model_dump()

    # Validate phone (UK mobile)
    if not re.match(r"^(?:07\d{9}|\+44\s?7\d{9})$", payload["phone"]):
        raise HTTPException(status_code=400, detail="phone: invalid UK mobile number")

    db = Session()
    try:
        # Make duplicate reasons explicit
        if db.query(User).filter(User.email == payload["email"]).first():
            raise HTTPException(status_code=409, detail="email already exists")

        if db.query(User).filter(
            and_(User.first_name == payload["first_name"], User.last_name == payload["last_name"])
        ).first():
            raise HTTPException(status_code=409, detail="name already exists")

        u = User(**payload)
        db.add(u)
        db.commit()
        db.refresh(u)
        return u

    # Error handling
    except HTTPException:
        db.rollback()
        raise

    except IntegrityError:
        # Catch any remaining uniqueness issue
        db.rollback()
        raise HTTPException(status_code=409, detail="duplicate violates unique constraint")

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"create failed: {type(e).__name__}: {e}")

    finally:
        db.close()
