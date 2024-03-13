import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../features/auth/userAuthSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) =>state.userAuth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);
  return (
    <>
      <section className="heading">
        <h1>Welcome</h1>
        <p>To Endpoints</p>
      </section>
      <section className="content"></section>
    </>
  );
};

export default Home;
