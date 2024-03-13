import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/userComponents/Header";
import Login from "./pages/userSide/Login";
import SignUp from "./pages/userSide/SignUp";
import Home from "./pages/userSide/Home";
import ForgotPassword from "./pages/userSide/ForgotPassword";
import VerifyOtp from "./pages/userSide/VerifyOtp";
import ChangePassword from "./pages/userSide/ChangePassword";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="*" element={<Header />} />
          </Routes>
          {/* User Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-pasword" element={<ForgotPassword />} />
            <Route path="/verifyOtp" element={<VerifyOtp />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
