import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

const Student = (props) => {
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      await getStudent();
    };
    fetchData();
  }, []);

  const getStudent = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/student", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      setStudentData(data.student);
      props.dashboardQuickInfo();
    } catch (error) {
      console.log("There was an error!!!", error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/student", {
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
        getStudent();
        props.showAlert("Student Added Succesfully", "success");
        refClose.current.click();
        clearData();
      }
    } catch (error) {}
  };
  const clearData = () => {
    setFormData({
      name: "",
      email: "",
    });
  };

  return (
    <div className="card p-3 shadow text-start mb-5">
      <div>
        <h2 className="d-inline-flex">Students</h2>

        <span
          className="btn btn-primary btn-sm float-end mx-1 shadow"
          data-bs-toggle="modal"
          data-bs-target="#AddModal"
          ref={ref}
        >
          Add
        </span>
        <span className="btn btn-primary btn-sm float-end mx-1 shadow">
          Send Exam Link Seleted Student
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
                  Add Student
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleAddStudent}>
                <div className="modal-body">
                  <div className="mb-2">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      onChange={handleChange}
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      onChange={handleChange}
                      placeholder="Enter Email"
                    />
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
      </div>

      <table className="table table-bordered table-hover mt-4 text-center">
        <thead>
          <tr>
            <th scope="col">Select for Link</th>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Send Exam Link</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentData &&
            studentData.map((student) => {
              return (
                <tr key={student.id}>
                  <td>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                  </td>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <span className="btn btn-sm btn-primary mx-1 shadow">
                      Send
                    </span>
                  </td>
                  <td>
                    <span className="btn btn-sm btn-primary mx-1 shadow">
                      Edit
                    </span>
                    <span className="btn btn-sm btn-danger mx-1 shadow">
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

export default Student;
