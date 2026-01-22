import React, { useState } from "react";
import "./NewUserForm.css";

export const NewUserForm = ({ isOpen = false, onClose, onCreated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setJobTitle("");
    setPhone("");
    setEmail("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      job_title: jobTitle.trim(),
      phone: phone.trim(),
      email: email.trim(),
    };

    // Minimal validation
    if (!payload.first_name || !payload.last_name) {
      setError("First name and last name are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Assumes your FastAPI backend supports POST /users
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create user");
      }

      const created = await res.json();
      if (onCreated) onCreated(created);
      resetForm();
      if (onClose) onClose();
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-user-overlay" onClick={handleClose}>
      <div className="new-user-card" onClick={(e) => e.stopPropagation()}>
        <form className="new-user-form" onSubmit={handleSubmit}>
          <div className="new-user-grid top-row">
            <input
              className="new-user-input"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="new-user-input"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="new-user-grid bottom-row">
            <input
              className="new-user-input"
              placeholder="Job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              className="new-user-input"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="new-user-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error ? <div className="new-user-error">{error}</div> : null}

          <div className="new-user-actions">
            <button
              type="submit"
              className="new-user-create"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};