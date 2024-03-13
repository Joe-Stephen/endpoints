import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendOtp, reset } from "../../features/auth/userAuthSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/verifyOtp");
    }
    dispatch(reset());
  }, [user, isError, dispatch, message, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail',email);
    const userEmail = {
      email,
    };
    dispatch(sendOtp(userEmail));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Email verification
        </h1>
        <p>Enter your registered email address</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Send otp
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ForgotPassword;
