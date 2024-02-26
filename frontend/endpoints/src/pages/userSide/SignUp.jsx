import React from "react";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "react-toastify";
import { signUp, reset } from "../../features/auth/userAuthSlice";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
  });

  const { name, email, password, confirm_password, location } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.userAuth
  );

    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
      dispatch(reset())

    }, [user, isError, dispatch, message, isSuccess]);

  const onChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      confirm_password,
      location,
    };
    dispatch(signUp(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          User Sign-Up
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              name="confirm_password"
              value={confirm_password}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              placeholder="Enter your location"
              onChange={onChange}
            />
          </div>
          {/* <div className='form-group'>
            <input
              type='file'
              className='form-control'
              id='profile'
              name='profile'
            />
          </div> */}
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignUp;
