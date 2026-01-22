SHELL := /bin/bash
.ONESHELL:

BACKEND_PORT ?= 8000
FRONTEND_PORT ?= 5173


setup: 
	python -m pip install -r backend/requirements.txt
	@echo "Seeding DB from Excel..."
	@.venv/bin/python backend/scripts/add_test_data.py
	@echo "Setup complete."

backend-run: backend-install
	@echo "Starting backend on http://localhost:$(BACKEND_PORT)"
	@$(PYTHON) -m uvicorn backend.main:app --host 127.0.0.1 --port $(BACKEND_PORT)

frontend-run:
	@cd frontend && npm run dev -- --port $(FRONTEND_PORT)


dev: 
	@set -e
	@echo "Starting both servers (backend: $(BACKEND_PORT), frontend: $(FRONTEND_PORT))"
	@trap 'echo "Stopping..."; kill 0' INT TERM
	@$(PYTHON) -m uvicorn backend.main:app --reload --host 127.0.0.1 --port $(BACKEND_PORT) &
	@cd frontend && npm run dev -- --port $(FRONTEND_PORT) &
	@wait

stop:
	@lsof -tiTCP:5173 -sTCP:LISTEN | xargs kill -9 2>/dev/null || true
	@lsof -tiTCP:8000 -sTCP:LISTEN | xargs kill -9 2>/dev/null || true

