import { useEffect, useState } from "react";
import axios from "axios";
import type { Employee } from "../types";

interface Props {
  token: string;
  employeeId: number;
  onBack: () => void;
  onEdit: (employee: Employee) => void;
}

export default function EmployeeDetail({ token, employeeId, onBack, onEdit }: Props) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`/api/employees/${employeeId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployee(res.data);
      } catch {
        setError("Failed to load employee details.");
      }
    };
    fetchEmployee();
  }, [employeeId, token]);

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={onBack} style={{ padding: "8px 16px" }}>Back to List</button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <button onClick={onBack} style={{ padding: "8px 16px", marginBottom: 20 }}>
        ← Back to List
      </button>
      <h2>{employee.first_name} {employee.last_name}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {([
            ["Email", employee.email],
            ["Department", employee.department],
            ["Job Title", employee.job_title],
            ["Phone", employee.phone],
            ["Hire Date", employee.hire_date],
            ["Status", employee.is_active ? "Active" : "Inactive"],
          ] as [string, string][]).map(([label, value]) => (
            <tr key={label}>
              <td style={{ padding: 10, fontWeight: "bold", borderBottom: "1px solid #eee", width: 140 }}>{label}</td>
              <td style={{ padding: 10, borderBottom: "1px solid #eee" }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => onEdit(employee)}
        style={{ marginTop: 20, padding: "8px 16px" }}
      >
        Edit Employee
      </button>
    </div>
  );
}
