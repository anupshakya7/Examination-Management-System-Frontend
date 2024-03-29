import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Student from "./Student";

const Home = (props) => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [physicsQuestion, setPhysicsQuestion] = useState("");
  const [chemistryQuestion, setChemistryQuestion] = useState("");
  const [student, setStudent] = useState("");
  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (!userInfo) {
      navigate("/login");
    }
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/question/quick-info/dashboardQuickInfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setQuestion(data.question);
      setPhysicsQuestion(data.physics);
      setChemistryQuestion(data.chemistry);
      setStudent(data.student);
    } catch (error) {
      console.log("There was an error!!!", error);
    }
  };

  return (
    <div>
      <div className="row gx-5">
        <div className="col-xl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-primary text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">{question}</div>
                  <div className="card-text">Total Numbers of Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-danger text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">{physicsQuestion}</div>
                  <div className="card-text">
                    Total Numbers of Physics Questions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-success text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">
                    {chemistryQuestion}
                  </div>
                  <div className="card-text">
                    Total Numbers of Chemistry Questions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-warning text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">{student}</div>
                  <div className="card-text">Total Numbers of Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Student dashboardQuickInfo={getQuestions} showAlert={props.showAlert} />
    </div>
  );
};

export default Home;
