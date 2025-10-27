import React, { useState, useEffect } from "react";
import "./adminDashboard.scss";
import newRequest from "../../utils/newRequest";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await newRequest.post("/api/admin/login", credentials);
      setAdmin(res.data.admin);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setFetching(true);
      const res = await newRequest.get("/api/admin/students");
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to fetch students");
    } finally {
      setFetching(false);
    }
  };

  const handleStatusChange = async (studentId, status) => {
    try {
      await newRequest.patch(`/api/admin/students/${studentId}/status`, { status });
      setStudents((prev) =>
        prev.map((s) => (s._id === studentId ? { ...s, status } : s))
      );
      toast.success(`Student ${status} successfully`);
    } catch (err) {
      toast.error("Action failed");
    }
  };

  useEffect(() => {
    if (admin) fetchStudents();
  }, [admin]);

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {!admin ? (
          <div className="login-form">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Admin Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        ) : (
          <div className="students-section">
            <h2>Talents</h2>
            {fetching ? (
              <div className="loader"></div>
            ) : students.length === 0 ? (
              <p>No students found</p>
            ) : (
              <div className="student-grid">
                {students.map((student) => (
                  <div key={student._id} className="student-card">
                    <img
                      src={
                        student.certificateUrl
                          ? `${newRequest.defaults.baseURL}${student.certificateUrl}`
                          : "/img/default-avatar.png"
                      }
                      alt={student.name}
                      className="student-cert"
                      onClick={() =>
                        student.certificateUrl &&
                        setSelectedCert(`${newRequest.defaults.baseURL}${student.certificateUrl}`)
                      }
                    />
                    <h4>{student.name}</h4>
                    <p className={`status ${student.status}`}>{student.status}</p>
                    <div className="actions">
                      <button
                        className="approve"
                        onClick={() =>
                          handleStatusChange(student._id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject"
                        onClick={() =>
                          handleStatusChange(student._id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                    {student.certificateUrl && (
                      <button
                        className="view-cert"
                        onClick={() =>
                          setSelectedCert(`${newRequest.defaults.baseURL}${student.certificateUrl}`)
                        }
                      >
                        View Certificate
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      
      {selectedCert && (
        <div className="cert-modal" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedCert} alt="Certificate" />
            <button onClick={() => setSelectedCert(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
