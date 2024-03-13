import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendOtp, verifyOtp, reset } from "../../features/auth/userAuthSlice";

const VerifyOtp = () => {
  const [formData, setFormData] = useState({ otpAttempt: "" });
  const [seconds, setSeconds] = useState(30);

  const { otpAttempt } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess || user) {
    //   navigate("/changePassword");
    // }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.trim(),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const otpData = {
      otpAttempt,
      userId,
    };
    dispatch(verifyOtp(otpData));
  };

  const onResend = (e) => {
    e.preventDefault(); // Prevent the default behavior of the button click event
    const email = localStorage.getItem("userEmail");
    const userEmail = { email };
    setSeconds(30);
    dispatch(sendOtp(userEmail));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Email verification
        </h1>
        <p>Enter the OTP received</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="otpAttempt"
              name="otpAttempt"
              required
              value={otpAttempt}
              placeholder="Enter the OTP"
              onChange={onChange}
            />
          </div>
          <div className="form-subtext">
            <p>You can resend OTP in</p>
          </div>
          <div className="form-subtext">
            {seconds > 0 ? (
              <button onClick={onResend} className="btn-small" disabled>
                Resend OTP ({seconds})
              </button>
            ) : (
              <button onClick={onResend} className="btn-small">
                Resend OTP
              </button>
            )}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Verify OTP
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default VerifyOtp;
