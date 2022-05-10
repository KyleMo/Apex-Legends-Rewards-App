import { Link } from "react-router-dom"
import './navbar.css'
import logo from '../../images/logo.png'


const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-headers">
        <img className="logo" src={logo}></img>
        <h2 className="navbar-header">Rewardpex</h2>
      </Link>
      <ul className="navbar-links">
        <Link to="/profile"><li>Profile</li></Link>
        <Link to="/how-it-works"><li>How it works</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
