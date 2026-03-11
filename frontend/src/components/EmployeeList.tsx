import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import type { Employee } from "../types";

interface Props {
  token: string;
  onLogout: () => void;
  onSelectEmployee: (id: number) => void;
  onEditEmployee: (employee: Employee) => void;
  onAddEmployee: () => void;
}

export default function EmployeeList({
  token,
  onLogout,
  onSelectEmployee,
  onEditEmployee,
  onAddEmployee,
}: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [search]);

  const fetchEmployees = async () => {
    const res = await axios.get("/api/employees/", {
      headers: { Authorization: `Bearer ${token}` },
      params: search ? { search } : {},
    });
    setEmployees(res.data);
  };

  const departments = useMemo(() => {
    const depts = new Set(employees.map((e) => e.department));
    return Array.from(depts).sort();
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    if (!departmentFilter) return employees;
    return employees.filter((e) => e.department === departmentFilter);
  }, [employees, departmentFilter]);

  return (
    <div
      style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Employee Directory</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onAddEmployee} style={{ padding: "8px 16px" }}>
            Add Employee
          </button>
          <button onClick={onLogout} style={{ padding: "8px 16px" }}>
            Log Out
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search by name, department, title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Department</th>
            <th style={th}>Job Title</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr
              key={emp.id}
              onClick={() => onSelectEmployee(emp.id)}
              style={{ cursor: "pointer" }}
            >
              <td style={td}>
                {emp.first_name} {emp.last_name}
              </td>
              <td style={td}>{emp.email}</td>
              <td style={td}>{emp.department}</td>
              <td style={td}>{emp.job_title}</td>
              <td style={td}>{emp.is_active ? "Active" : "Inactive"}</td>
              <td style={td}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEmployee(emp);
                  }}
                  style={{ padding: "4px 12px" }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: 10,
  textAlign: "left",
  borderBottom: "2px solid #ddd",
};
const td: React.CSSProperties = { padding: 10, borderBottom: "1px solid #eee" };
