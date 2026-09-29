import { Link, useNavigate } from 'react-router-dom'

function Navbar({ title }) {

  const navigate = useNavigate()

  const storedUser = sessionStorage.getItem('loggedInUser')

  const handleLogout = () => {

    sessionStorage.removeItem('loggedInUser')

    navigate('/login')
  }

  return (

    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        {title}
      </Link>


      <div className="nav-links">

        {storedUser && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/skills">
              Skills
            </Link>

            <Link to="/teachers">
              Teachers
            </Link>

            <Link to="/connections">
              Connections
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="nav-logout"
            >
              Logout
            </button>
          </>
        )}

        {!storedUser && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar