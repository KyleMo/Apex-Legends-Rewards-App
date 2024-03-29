import React from 'react'
import { useNavigate, useLocation, Link } from "react-router-dom"
import './navbar.css'
import logo from '../../images/logo.png'

const Navbar = () => {


  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userLogin')))
  const location = useLocation();
  const navigate = useNavigate();


  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userLogin')))
  },[location])

  const handleLogout = () => {
    setUserData(null)
    localStorage.removeItem('userLogin')
    // if location == homepage then window location resfrsh
    if (location.pathname === "/"){
      window.location.reload(false)
    }
    navigate("/")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-headers">
        <img alt="Rewardpex" className="logo" src={logo}></img>
        <h2 className="navbar-header">Rewardpex</h2>
      </Link>
      <ul className="navbar-links">
        {userData && <Link to="/profile"><li>Profile</li></Link>}
        <Link to="/how-it-works"><li>How it works</li></Link>
        {userData ? <div onClick={handleLogout}><li className="log-out">Log out</li></div> : <Link to="/login"><li>Log in</li></Link>}
      </ul>

    </nav>
  )
}

export default Navbar
