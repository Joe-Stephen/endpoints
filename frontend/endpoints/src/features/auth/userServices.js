import axios from "axios";

const API_URL = "/";

//User sign-up
const signUp = async (userData) => {
  const response = await axios.post(API_URL+'sign-up', userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const userServices={
    signUp
}
export default userServices;
