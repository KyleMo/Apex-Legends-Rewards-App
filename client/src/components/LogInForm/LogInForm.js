import './loginform.css'
import { Link } from 'react-router-dom';

const LogInForm = ({ logInDetails, handleChange, handleSubmit, handleCheckbox, useDemo}) => {


  return (
    <form className="log-in-form" onSubmit={handleSubmit}>
      <div className="demo-container">
        <input className="useDemo" onChange={handleCheckbox} name="useDemo" type="checkbox"></input>
        <label className="demo-label" htmlFor="useDemo">Use demo creditials</label>
      </div>
      <input
        className="login-input"
        type="text"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={logInDetails.email}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="password"
        value={logInDetails.password}
      />
      <button className="login-input" name="submit-btn" type="Submit">Log in</button>
      <Link className="create-account" to="/register">Create account</Link>
    </form>
  )
}

export default LogInForm;
