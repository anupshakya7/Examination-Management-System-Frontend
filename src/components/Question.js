import moment from "moment";
import React, { useEffect, useState } from "react";

const Question = () => {
  const [questionData, setQuestionData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getQuestion();
    };
    fetchData();
  }, []);

  const getQuestion = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/question", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setQuestionData(data.question);
    } catch (error) {
      console.log("There was an error!!!", error);
    }
  };

  return (
    <div className="card p-3 shadow text-start">
      <div>
        <h2 className="d-inline-flex">Questions</h2>
        <span
          className="btn btn-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#AddModal"
        >
          Add
        </span>

        <div
          className="modal fade"
          id="AddModal"
          tabIndex="-1"
          aria-labelledby="AddModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Questions
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form>
                <div className="modal-body">
                  <div className="mb-2">
                    <label htmlFor="question" className="form-label">
                      Question
                    </label>
                    <input type="text" className="form-control" id="question" />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <select className="form-control" id="subject">
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Status
                    </label>
                    <select className="form-control" id="status">
                      <option value="">Active</option>
                      <option value="">Deactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="question" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="expiry_date"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-hover text-nowrap mt-4">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Questions</th>
            <th scope="col">Subject</th>
            <th scope="col">Answer</th>
            <th scope="col">Status</th>
            <th scope="col">Remaining Days</th>
          </tr>
        </thead>
        <tbody>
          {questionData &&
            questionData.map((question) => {
              return (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>{question.question}</td>
                  <td>
                    <span className="badge bg-danger">{question.subject}</span>
                  </td>
                  <td>350</td>
                  <td>
                    <span
                      className={`badge ${
                        question.status == 1 ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {question.status == 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td>
                    {moment(question.expiry_date).diff(moment(), "days")} Days
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Question;
