import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const Question = (props) => {
  const [questionData, setQuestionData] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    subject: "",
    status: "",
    expiry_date: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const refAns = useRef(null);
  const refEdit = useRef(null);
  const refEditClose = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
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

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.status === 200) {
        getQuestion();
        props.showAlert("Question Added Succesfully", "success");
        refClose.current.click();
        clearData();
      }
    } catch (error) {}
  };
  const clearData = () => {
    setFormData({
      question: "",
      subject: "",
      status: "",
      expiry_date: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: "",
    });
  };

  const answerModal = (currentAnswer) => {
    refAns.current.click();
    setFormData({
      question: currentAnswer.question,
      option1:
        currentAnswer.answer[0] != null ? currentAnswer.answer[0].option1 : "",
      option2:
        currentAnswer.answer[0] != null ? currentAnswer.answer[0].option2 : "",
      option3:
        currentAnswer.answer[0] != null ? currentAnswer.answer[0].option3 : "",
      option4:
        currentAnswer.answer[0] != null ? currentAnswer.answer[0].option4 : "",
      correct:
        currentAnswer.answer[0] != null ? currentAnswer.answer[0].correct : "",
    });
  };

  const handleEditModal = (currentQuestion) => {
    refEdit.current.click();
    setFormData({
      id: currentQuestion.id,
      question: currentQuestion.question,
      subject: currentQuestion.subject,
      status: currentQuestion.status,
      expiry_date: currentQuestion.expiry_date,
      option1:
        currentQuestion.answer[0] != null
          ? currentQuestion.answer[0].option1
          : "",
      option2:
        currentQuestion.answer[0] != null
          ? currentQuestion.answer[0].option2
          : "",
      option3:
        currentQuestion.answer[0] != null
          ? currentQuestion.answer[0].option3
          : "",
      option4:
        currentQuestion.answer[0] != null
          ? currentQuestion.answer[0].option4
          : "",
      correct:
        currentQuestion.answer[0] != null
          ? currentQuestion.answer[0].correct
          : "",
    });
  };

  const handleUpdateQuestion = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/question/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status === 200) {
        getQuestion();
        props.showAlert("Question Updated Successfully", "success");
        refEditClose.current.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/question/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status === 200) {
        getQuestion();
        props.showAlert("Question Deleted Successfully", "success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-3 shadow text-start mb-5">
      <div>
        <h2 className="d-inline-flex">Questions</h2>
        <span
          className="btn btn-primary btn-sm float-end shadow"
          data-bs-toggle="modal"
          data-bs-target="#AddModal"
          ref={ref}
        >
          Add
        </span>

        {/* Add Modal */}
        <div
          className="modal fade"
          id="AddModal"
          tabIndex="-1"
          aria-labelledby="AddModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
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
              <form onSubmit={handleAddQuestion}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="question" className="form-label">
                          Question
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="question"
                          onChange={handleChange}
                          placeholder="Write Question.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <select
                          className="form-control"
                          id="subject"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Subject</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="question" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          id="status"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Deactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="question" className="form-label">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="expiry_date"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <h5>Answer</h5>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option1" className="form-label">
                          Option 1
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option1"
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option2" className="form-label">
                          Option 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option2"
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option3" className="form-label">
                          Option 3
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option3"
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option4" className="form-label">
                          Option 4
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option4"
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="mb-2 text-center mt-3">
                        <label className="mb-2" htmlFor="right_ans">
                          Right Option
                        </label>
                        <br />
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            value={formData.option1}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            1
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            value={formData.option2}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            2
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            value={formData.option3}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            3
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            value={formData.option4}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            4
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refClose}
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

        {/* Edit Modal */}
        <div
          className="modal fade"
          id="EditModal"
          tabIndex="-1"
          aria-labelledby="EditModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Questions
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={(e) => handleUpdateQuestion(e, formData.id)}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="question" className="form-label">
                          Question
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="question"
                          value={formData.question}
                          onChange={handleChange}
                          placeholder="Write Question.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <select
                          className="form-control"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Subject</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="question" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-control"
                          id="status"
                          value={formData.status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Status</option>
                          <option value="1">Active</option>
                          <option value="0">Deactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-3">
                        <label htmlFor="question" className="form-label">
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="expiry_date"
                          value={formData.expiry_date}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <h5>Answer</h5>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option1" className="form-label">
                          Option 1
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option1"
                          value={formData.option1}
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option2" className="form-label">
                          Option 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option2"
                          value={formData.option2}
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option3" className="form-label">
                          Option 3
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option3"
                          value={formData.option3}
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-2">
                        <label htmlFor="option4" className="form-label">
                          Option 4
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="option4"
                          value={formData.option4}
                          onChange={handleChange}
                          placeholder="Write Option.."
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="mb-2 text-center mt-3">
                        <label className="mb-2" htmlFor="right_ans">
                          Right Option
                        </label>
                        <br />
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            checked={
                              formData.correct !== null &&
                              formData.option1 == formData.correct
                            }
                            value={formData.option1}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            1
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            checked={
                              formData.correct !== null &&
                              formData.option2 == formData.correct
                            }
                            value={formData.option2}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            2
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            checked={
                              formData.correct !== null &&
                              formData.option3 == formData.correct
                            }
                            value={formData.option3}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            3
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="correct"
                            checked={
                              formData.correct !== null &&
                              formData.option4 == formData.correct
                            }
                            value={formData.option4}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            4
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    ref={refEditClose}
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Answer Modal */}
        <div
          className="modal fade"
          id="AddAnsModal"
          tabIndex="-1"
          aria-labelledby="AddAnsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add Answer
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleAddQuestion}>
                <div className="modal-body">
                  <div className="row">
                    <p>{formData.question}</p>
                    <div className="col-sm-6">
                      <div
                        className={`card p-2 my-1 ${
                          formData.option1 === formData.correct
                            ? "bg-success text-white"
                            : ""
                        } `}
                      >
                        <p>
                          1. <span>{formData.option1}</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className={`card p-2 my-1 ${
                          formData.option2 === formData.correct
                            ? "bg-success text-white"
                            : ""
                        } `}
                      >
                        <p>
                          2. <span>{formData.option2}</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className={`card p-2 my-1 ${
                          formData.option3 === formData.correct
                            ? "bg-success text-white"
                            : ""
                        } `}
                      >
                        <p>
                          3. <span>{formData.option3}</span>
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className={`card p-2 my-1 ${
                          formData.option4 === formData.correct
                            ? "bg-success text-white"
                            : ""
                        } `}
                      >
                        <p>
                          4. <span>{formData.option4}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col" style={{ width: "400px" }}>
              Questions
            </th>
            <th scope="col" className="text-center">
              Subject
            </th>
            <th scope="col" className="text-center">
              Answer
            </th>
            <th scope="col" className="text-center">
              Status
            </th>
            <th scope="col" className="text-center">
              Remaining Days
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {questionData &&
            questionData.map((question) => {
              return (
                <tr key={question.id}>
                  <td>{question.id}</td>
                  <td>{question.question}</td>
                  <td className="text-center">
                    <span
                      className={`badge shadow ${
                        question.subject === "Physics"
                          ? "bg-danger"
                          : "bg-primary"
                      } `}
                    >
                      {question.subject}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      ref={refAns}
                      className="badge bg-success shadow"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#AddAnsModal"
                    >
                      <span onClick={() => answerModal(question)}>Answer</span>
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge shadow ${
                        question.status == 1 ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {question.status == 1 ? "Active" : "Deactive"}
                    </span>
                  </td>
                  <td className="text-center">
                    {moment(question.expiry_date).diff(moment(), "days") + 1 > 0
                      ? moment(question.expiry_date).diff(moment(), "days") +
                        1 +
                        " Days"
                      : "Date Expired"}
                  </td>
                  <td className="text-center">
                    <span
                      className="btn btn-sm btn-primary mx-1 shadow"
                      ref={refEdit}
                      data-bs-toggle="modal"
                      data-bs-target="#EditModal"
                    >
                      <span onClick={() => handleEditModal(question)}>
                        Edit
                      </span>
                    </span>
                    <span
                      className="btn btn-sm btn-danger mx-1 shadow"
                      onClick={(e) => handleDelete(e, question.id)}
                    >
                      Delete
                    </span>
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
