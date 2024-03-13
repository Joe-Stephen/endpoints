import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { verifyOtp, reset, changePassword } from "../../features/auth/userAuthSlice";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

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
      navigate("/");
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
    const userId = localStorage.getItem("userId");
    const newPassword = {
      userId,
      password,
      confirmPassword,
    };
    dispatch(changePassword(newPassword));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Email verification
        </h1>
        <p>Enter the otp recieved</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              required
              value={password}
              placeholder="Enter the otp"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              required
              value={confirmPassword}
              placeholder="Enter the otp"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Verify otp
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default ChangePassword;
