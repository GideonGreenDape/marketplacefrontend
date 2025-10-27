import React, { useEffect, useState } from "react";
import "./EngageTalents.css"; 
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import noavatar from "../../../public/img/noavatar.jpg"; 

function EngageTalents() {
  const [talents, setTalents] = useState([]);
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const res = await newRequest.get("api/students/students");
        setTalents(res.data);
      } catch (err) {
        console.error("Error fetching talents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, []);

  const handleShowMore = () => setVisible((prev) => prev + 6);

  return (
    <div className="engage-talents-page">
      <div className="engage-header">
        <h1>Engage Talents</h1>
        <p>
          Discover top freelancers trained by <strong>MyDreamConnect</strong>
        </p>
      </div>

      
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p>Fetching top talents...</p>
        </div>
      ) : (
        <>
          <div className="talent-grid">
            {talents.slice(0, visible).map((talent) => (
              <div key={talent._id} className="talent-card">
                <div className="talent-avatar-container">
                  <img
                    src={
                      talent.profilePhoto
                        ? `${newRequest.defaults.baseURL}${talent.profilePhoto}`
                        : noavatar
                    }
                    alt={talent.name}
                    className="talent-avatar"
                  />
                </div>

                <div className="talent-info">
                  <h3>{talent.name}</h3>
                  <span className="trained-tag">
                    Talent trained by MyDreamConnect
                  </span>

                  {talent.availability && (
                    <p className="availability">
                      <strong>Availability: {talent.availability}</strong>
                    </p>
                  )}

                  {talent.skills?.length > 0 && (
                    <div className="skills">
                      <strong>Skills:</strong>
                      <ul>
                        {talent.skills.slice(0, 2).map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    className="view-profile-btn"
                    onClick={() => navigate(`/talent/${talent._id}`)}
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {visible < talents.length && (
            <div className="show-more-container">
              <button onClick={handleShowMore} className="show-more-btn">
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EngageTalents;
