import React from 'react'
import Error from '../Error/Error.js'
import Loading from '../Homepage/Loading.js'
import axios from 'axios'
import './registerpage.css'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

  const navigate = useNavigate();
  const [accountCreated, setAccountCreated] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [invalidPasswords, setInvalidPasswords] = React.useState(false)
  const [invalidEmail, setInvalidEmail] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [registerData, setRegisterData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPass: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidEmail() && passwordMatchCheck()){
      try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }
        setLoading(true)
        const { data } = await axios.post('/api/users/register', registerData, config)
        localStorage.setItem('userLogin', JSON.stringify(data))
        setLoading(false)
        setAccountCreated(true)
        navigate('/profile');
      } catch (e) {
        setLoading(false)
        setError(e.response.data.message)
      }
    } else {
      if(!isValidEmail()){
        setInvalidEmail(true)
      }
      if (!passwordMatchCheck()){
        setInvalidPasswords(true)
      }
    }
  }

  const handleChange = (e) => {
    setInvalidPasswords(false)
    setInvalidEmail(false)
    setRegisterData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const isValidEmail = () => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(registerData.email) ? true : false
  };

  const passwordMatchCheck = () => registerData.password === registerData.confirmPass

  return(
    <main className="register-page">
    {invalidEmail && <Error message="Please enter a valid email" />}
    {invalidPasswords && <Error message="Passwords don't match" />}
    {error && <Error message={error} />}
    {loading && <Loading />}
    {accountCreated && <h3>Account has been created!</h3>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          className="register-input"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          value={registerData.username}
        />
        <input
          className={invalidEmail?"register-input-error":"register-input"}
          type="text"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={registerData.email}
        />
        <input
          className={invalidPasswords?"register-input-error":"register-input"}
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={registerData.password}
        />
        <input
          className={invalidPasswords?"register-input-error":"register-input"}
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          name="confirmPass"
          value={registerData.confirmPass}
        />
        <input className="register-input" value="Create Account" type="Submit" />
      </form>


    </main>
  )
}

export default RegisterPage;
