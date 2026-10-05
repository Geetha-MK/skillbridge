import { Link, useNavigate } from "react-router-dom";


function Navbar({ title = "SkillBridge" }) {

  const navigate = useNavigate();

  const storedUser = sessionStorage.getItem("loggedInUser");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    user = null;
  }


  const handleLogout = () => {

    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("authHeader");

    navigate("/login");
  };


  return (

    <nav className="navbar">

      {/* Logo */}

      <Link to="/" className="logo">
        {title}
      </Link>


      {/* Navigation */}

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/skills">
          Skills
        </Link>

        <Link to="/teachers">
          Teachers
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/connections">
          Connections
        </Link>

        <Link to="/future-features">
          Future Features
        </Link>


        {/* Logged-in user */}

        {user ? (

          <div className="user-menu">

            <Link
              to="/profile"
              className="profile-link"
            >

              <span className="profile-avatar">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"
                }
              </span>

              <span className="profile-name">
                {user.name || "Profile"}
              </span>

            </Link>


            <button
              onClick={handleLogout}
              className="nav-logout"
            >
              Logout
            </button>

          </div>

        ) : (

          <div className="guest-actions">

            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-link"
            >
              Get Started
            </Link>

          </div>

        )}

      </div>

    </nav>

  );
}


export default Navbar;