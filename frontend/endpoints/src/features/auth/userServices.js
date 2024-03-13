import axios from "axios";

const API_URL = "http://localhost:5000";

//User sign-up
const signUp = async (userData) => {
  const response = await axios.post(API_URL+'/sign-up', userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//user login
const login=async(loginData)=>{
  const response=await axios.post(API_URL+'/login', loginData);
  if(response.data){
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
}

//user forgot password-sendOtp
const sendOtp=async(email)=>{
  const response=await axios.post(API_URL+'/verifyEmail', email);
  console.log("response obj== ",response)
  if(response.data){
    localStorage.setItem("userId",response.data.userId)
  }
  return response.data;
}

//user forgot password-sendOtp
const verifyOtp=async(otpData)=>{
  const response=await axios.post(API_URL+'/verityOtp', otpData);
  console.log("otp response= ",response);
  return response.data;
}

//change password
const changePassword=async(newPassword)=>{
  const response=await axios.post(API_URL+'/changePassword', newPassword);
  console.log("otp response= ",response);
  return response.data;
}


//user logout
const logout=()=>{
  localStorage.removeItem("user");
}

const userServices={
    signUp,
    login,
    logout,
    sendOtp,
    verifyOtp,
    changePassword
}
export default userServices;
