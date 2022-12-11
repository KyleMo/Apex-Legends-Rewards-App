import './footer.css';
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-header-container">
        <h3 className="footer-header">Rewardpex</h3>
      </div>
      <p className="footer-attribute">Made with 😡 <span>by Kyle Monstad</span></p>
      <nav className="footer-nav">
        <Link to="/" className="Link-link">Homepage</Link>
        <Link to="/how-it-works" className="Link-link">How it works</Link>
      </nav>
    </footer>
  )
}

export default Footer;
