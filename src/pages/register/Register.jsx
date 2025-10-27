import React, { useState } from "react";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState(""); // employer | student | login
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ error: "", success: "" });

  const [employer, setEmployer] = useState({
    companyName: "",
    companyWebsite: "",
    industryType: "",
    companySize: "",
    companyAddress: "",
    country: "",
    state: "",
    yearFounded: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });

  const [student, setStudent] = useState({
    name: "",
    dob: "",
    mobileNumber: "",
    email: "",
    portfolioLink: "",
    availability: "",
    skills: "",
    experience: "",
    certificate: null,
    password: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, type) => {
    const { name, value, files } = e.target;
    if (type === "employer") {
      setEmployer((prev) => ({ ...prev, [name]: value }));
    } else if (type === "student") {
      if (name === "certificate") {
        setStudent((prev) => ({ ...prev, certificate: files[0] }));
      } else {
        setStudent((prev) => ({ ...prev, [name]: value }));
      }
    } else if (type === "login") {
      setLogin((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (type, e) => {
  e.preventDefault();
  setMsg({ error: "", success: "" });

  
  if (type === "employer") {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "companyName",
      "state",
    ];
    for (let field of requiredFields) {
      if (!employer[field]?.trim()) {
        setMsg({ error: `${field.replace(/([A-Z])/g, " $1")} is required.` });
        return;
      }
    }

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employer.email)) {
      setMsg({ error: "Please enter a valid email address." });
      return;
    }
  }

  if (type === "student") {
    const requiredFields = [
      "name",
      "dob",
      "mobileNumber",
      "email",
      "portfolioLink",
      "availability",
      "skills",
      "experience",
      "certificate",
      "password",
    ];
    for (let field of requiredFields) {
      if (!student[field] || (typeof student[field] === "string" && !student[field].trim())) {
        setMsg({ error: `${field.replace(/([A-Z])/g, " $1")} is required.` });
        return;
      }
    }

    
    const dob = new Date(student.dob);
let age = new Date().getFullYear() - dob.getFullYear(); // use let here
const monthDiff = new Date().getMonth() - dob.getMonth();

if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < dob.getDate())) {
  age--; // now this works fine
}

if (age < 18) {
  setMsg({ error: "You must be at least 18 years old to register." });
  return;
}


    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      setMsg({ error: "Please enter a valid email address." });
      return;
    }
  }

  if (type === "login") {
    if (!login.email.trim() || !login.password.trim()) {
      setMsg({ error: "Please fill in both email and password fields." });
      return;
    }
  }

  
  setLoading(true);

  try {
    if (type === "employer") {
      await newRequest.post("api/employers/signup", employer);
      setMsg({ success: "Employer registered successfully!" });
    }

    if (type === "student") {
      const formData = new FormData();
      for (const key in student) formData.append(key, student[key]);
      await newRequest.post("api/students/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg({ success: "Bootcamp Freelancer registered successfully!" });
    }

    if (type === "login") {
      let endpoint = "";
      if (login.role === "employer") endpoint = "api/employers/login";
      else if (login.role === "admin") endpoint = "api/admin/login";
      else endpoint = "api/students/login";

      const res = await newRequest.post(endpoint, login);
      console.log("Login response:", res);
      setMsg({ success: res.data.message });
    }

   setTimeout(() => {
  setMsg({ error: "", success: "" });
}, 4000); 

  } catch (err) {
    console.error(err);
    setMsg({
      error:
        err?.response?.data?.message ||
        "Something went wrong. Check your inputs.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="register-container">
      <div className="register-buttons">
        <button
          className={mode === "employer" ? "active" : ""}
          onClick={() => setMode("employer")}
        >
          Sign up as Employer
        </button>
        <button
          className={mode === "student" ? "active" : ""}
          onClick={() => setMode("student")}
        >
          Sign up as MyDreamConnect Bootcamp Graudate
        </button>
      </div>

      <button className="engage-btn" onClick={() => navigate("/Talents")}>
        Engage a Talent
      </button>

      <button
        className={`login-toggle ${mode === "login" ? "active" : ""}`}
        onClick={() => setMode("login")}
      >
        Login
      </button>

      {msg.error && <p className="error">{msg.error}</p>}
      {msg.success && <p className="success">{msg.success}</p>}

      {/* Employer form */}
      {mode === "employer" && (
        <form
          onSubmit={(e) => handleSubmit("employer", e)}
          className="form-box"
        >
          <h2>Employer Registration</h2>
          <input
            name="companyName"
            placeholder="Company Name"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="companyWebsite"
            placeholder="Company Website"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="industryType"
            placeholder="Industry Type"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="companySize"
            placeholder="Company Size"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="companyAddress"
            placeholder="Company Address"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="country"
            placeholder="Country"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="state"
            placeholder="State"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="yearFounded"
            placeholder="Year Founded"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="firstName"
            placeholder="First Name"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={(e) => handleChange(e, "employer")}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "employer")}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Employer"}
          </button>
        </form>
      )}

      {/* Student form */}
      {mode === "student" && (
        <form onSubmit={(e) => handleSubmit("student", e)} className="form-box">
          <h2>MyDreamConnect BootCamp Graduate</h2>

          <input
            name="name"
            placeholder="Full Name"
            onChange={(e) => handleChange(e, "student")}
          />
          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            onChange={(e) => handleChange(e, "student")}
          />
          <input
            name="mobileNumber"
            placeholder="Mobile Number"
            onChange={(e) => handleChange(e, "student")}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e, "student")}
          />
          <input
            name="portfolioLink"
            placeholder="Portfolio Link"
            onChange={(e) => handleChange(e, "student")}
          />

          <select
            name="availability"
            onChange={(e) => handleChange(e, "student")}
          >
            <option value="">Availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="freelance">Freelance</option>
            <option value="internship">Internship</option>
          </select>

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            onChange={(e) => handleChange(e, "student")}
          />

          <textarea
            name="experience"
            placeholder="Brief experience or background"
            rows="4"
            onChange={(e) => handleChange(e, "student")}
          ></textarea>

          <label>Upload Bootcamp Certificate</label>
          <input
            type="file"
            name="certificate"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleChange(e, "student")}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "student")}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register as Freelancer"}
          </button>
        </form>
      )}

      {/* Login form */}
      {mode === "login" && (
        <form onSubmit={(e) => handleSubmit("login", e)} className="form-box">
          <h2>Login</h2>

          <select
            name="role"
            onChange={(e) =>
              setLogin((prev) => ({ ...prev, role: e.target.value }))
            }
          >
            <option value="student">Bootcamp Student</option>
            <option value="employer">Employer</option>
            {/* <option value="admin">Admin</option> */}
          </select>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e, "login")}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, "login")}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
