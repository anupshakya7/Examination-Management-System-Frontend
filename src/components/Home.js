import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className="row gx-5">
        <div className="col-xxl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-primary text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">101.1K</div>
                  <div className="card-text">Total Numbers of Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-danger text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">101.1K</div>
                  <div className="card-text">
                    Total Numbers of Physics Questions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-success text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">101.1K</div>
                  <div className="card-text">
                    Total Numbers of Chemistry Questions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-md-6 mb-5">
          <div
            className="card card-raised bg-warning text-white shadow"
            id="quick_info"
          >
            <div className="card-body px-4 text-center">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="me-2">
                  <div className="display-5 text-white">101.1K</div>
                  <div className="card-text">Total Numbers of Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3 text-start shadow">
        <h2>Students</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
