import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/userAuthSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

    const onLogout = () => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    };

  return (
    <header className="header">
      <div className="logo">
        <h1><Link to="/">ENDPOINTS</Link></h1>
      </div>
      <ul>
        {user ? (
          <>
            <li> Welcome {user.name}
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
              <Link to="profile">
                <FaUser /> Profile
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaUser /> Sign-Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
