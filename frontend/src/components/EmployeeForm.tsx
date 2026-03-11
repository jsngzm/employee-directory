import { useState } from "react";
import axios from "axios";
import type { Employee } from "../types";

interface Props {
  token: string;
  employee: Employee | null; // null = create mode
  onClose: () => void;
  onSaved: () => void;
}

export default function EmployeeForm({ token, employee, onClose, onSaved }: Props) {
  const [formData, setFormData] = useState({
    first_name: employee?.first_name ?? "",
    last_name: employee?.last_name ?? "",
    email: employee?.email ?? "",
    department: employee?.department ?? "",
    job_title: employee?.job_title ?? "",
    phone: employee?.phone ?? "",
    hire_date: employee?.hire_date ?? "",
    is_active: employee?.is_active ?? true,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (employee) {
        await axios.put(`/api/employees/${employee.id}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/employees/", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onSaved();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const data = err.response.data;
        const messages = Object.entries(data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join("\n");
        setError(messages);
      } else {
        setError("An error occurred.");
      }
    }
  };

  const fields: { name: string; label: string; type?: string }[] = [
    { name: "first_name", label: "First Name" },
    { name: "last_name", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "department", label: "Department" },
    { name: "job_title", label: "Job Title" },
    { name: "phone", label: "Phone" },
    { name: "hire_date", label: "Hire Date", type: "date" },
  ];

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4, fontWeight: "bold" }}>
              {field.label}
            </label>
            <input
              name={field.name}
              type={field.type ?? "text"}
              value={formData[field.name as keyof typeof formData] as string}
              onChange={handleChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: "bold" }}>
            <input
              name="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Active
          </label>
        </div>
        {error && <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</p>}
        <div style={{ display: "flex", gap: 10 }}>
          <button type="submit" style={{ padding: "8px 16px" }}>
            {employee ? "Save Changes" : "Create Employee"}
          </button>
          <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
