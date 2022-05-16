import './loginform.css'
import { Link } from 'react-router-dom';

const LogInForm = ({ logInDetails, handleChange, handleSubmit }) => {


  return (
    <form className="log-in-form" onSubmit={handleSubmit}>
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
      <input className="login-input" value="Log in" type="Submit" />
      <Link className="create-account" to="/register">Create account</Link>
    </form>
  )
}

export default LogInForm;
