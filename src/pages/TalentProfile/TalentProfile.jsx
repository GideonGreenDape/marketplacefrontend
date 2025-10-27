import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./TalentProfile.scss";
import noavatar from "../../../public/img/noavatar.jpg"; 

function TalentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await newRequest.get(`api/students/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="talent-profile-loader">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!student) {
    return <p className="error">Student not found</p>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="talent-profile">
        <div className="profile-header">
          <img
            src={
              student.profilePhoto
                ? `${newRequest.defaults.baseURL}${student.profilePhoto}`
                : noavatar
            }
            alt={student.name}
            className="profile-avatar"
          />
          <div>
            <h2>{student.name}</h2>
            <p className="trained-tag">Trained by MyDreamConnect</p>
          </div>
        </div>

        <div className="profile-details">
          <p><strong>Email:</strong> {student.email}</p>
          {student.availability && (
            <p><strong>Availability:</strong> {student.availability}</p>
          )}
          {student.experience && (
            <p><strong>Experience:</strong> {student.experience}</p>
          )}
          {student.portfolioLink && (
            <p>
              <strong>Portfolio:</strong>{" "}
              <a href={student.portfolioLink} target="_blank" rel="noreferrer">
                {student.portfolioLink}
              </a>
            </p>
          )}
          {student.skills?.length > 0 && (
            <div className="skills">
              <strong>Skills:</strong>
              <ul>
                {student.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default TalentProfile;
