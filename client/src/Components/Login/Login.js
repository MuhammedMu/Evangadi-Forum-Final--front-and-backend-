import React, { useContext, useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Usercontext";
import axios from "axios";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();

  // To get form data
  const [form, setForm] = useState({});
  // To track change in form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Axios to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logging user 
    try {
      const loginRes = await axios.post(
        "http://localhost:3001/api/users/login",
        {
          email: form.email,
          password: form.password,
        }
      );
      
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/home");
    } catch (err) {
      console.log("problem", err);
      alert(err.response.data.msg);
    }
  };
  
  return (
    <div className="landing">
      {/* Login Section  */}
      <section className="login-section">
        <div className="container">
          <div className="row">
            {/* First part login  */}
            <div className="col-sm-9 col-md-7 col-lg-6 mx-auto " id="login">
              <div className="card border-0 shadow rounded-3 my-4">
                <div className="card-body p-4 p-sm-5 all">
                  <h5 className="card-title text-center fw-light fs-5 first-join fw-bold mb-4 mt-5 pt-2">
                    Login to your account
                  </h5>
                  <h6 className="card-title text-center mb-3 fw-light  ">
                    Don't have an account?
                    <Link to={"/signup"}>
                      <span className="create-link"> Create an account ? </span>
                    </Link>
                  </h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        id="floatingInput"
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                      <label htmlFor="floatingInput">Your Email </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        id="floatingPassword"
                        onChange={handleChange}
                        placeholder="Password"
                      />
                      <label htmlFor="floatingPassword">Your Password</label>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-login submit-button col-md-4"
                        type="submit"
                      >
                        Submit
                      </button>
                      <div className="form-check mb-3 text-center">
                        <label className="forget-password mt-3">
                          <span className="create-link">
                            <Link to={"/signup"}>Create an account ?</Link>
                          </span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Second Part  */}
            <div className="col-sm-9 col-md-7 col-lg-6 mb-2 mx-auto">
              <div className="  my-5">
                <div className="card-body p-4 p-sm-5 all">
                  <div className="about-link">About</div>
                  <h2 className="card-title fw-light  fw-bold evangadi-title">
                    Evangadi Networks Q&amp;A
                  </h2>
                  <h6 className="card-title  mb-4 fw-light login-description">
                    No matter what stage of life you are in, whether you’re just
                    starting elementary school or being promoted to CEO of a
                    Fortune 500 company, you have much to offer to those who are
                    trying to follow in your footsteps.
                  </h6>
                  <h6 className="login-description mb-5">
                    Wheather you are willing to share your knowledge or you are
                    just looking to meet mentors of your own, please start by
                    joining the network here.
                  </h6>
                  <div className="d-grid">
                    <button className="how-it-work-button">
                      <a href="https://www.evangadi.com/explained/">
                        HOW IT WORK
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
