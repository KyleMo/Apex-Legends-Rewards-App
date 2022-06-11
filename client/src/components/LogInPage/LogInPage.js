import React from 'react';
import './loginpage.css';
import axios from 'axios';
import LogInForm from '../LogInForm/LogInForm.js'
import Loading from '../Homepage/Loading.js'
import Error from '../Error/Error.js'
import {useNavigate} from 'react-router-dom';

const LogInPage = () => {

  const [useDemo, setUseDemo] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [logInDetails, setLogInDetails] = React.useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();

  const handleCheckbox = (e) => {
    setUseDemo(prev => !prev)
    if(!useDemo){
      setLogInDetails({
        email: "testemail@gmail.com",
        password: "hirekyle123"
      })
    } else {
      setLogInDetails({
        email: "",
        password: ""
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true)
      const { data } = await axios.post('/api/users/login', logInDetails, config)
      localStorage.setItem('userLogin', JSON.stringify(data))
      setLoading(false)
      setLogInDetails({email: "", password:""})
      setUseDemo(false)
      navigate("/profile")

    } catch (e) {
      setLoading(false)
      setLogInDetails({email: "", password:""})
      setUseDemo(false)
      setError(e.response.data.message)
    }
  }

  const handleChange = (e) => {
    setLogInDetails(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  return(
    <div className="log-in-page">
      {loading ? <div className="load-div"><Loading /></div>: <LogInForm logInDetails={logInDetails} handleChange={handleChange} handleSubmit={handleSubmit} handleCheckbox={handleCheckbox} useDemo={useDemo}/>}
      {error && <div className="login-error"><Error message={error}/></div>}
    </div>
  )
}

export default LogInPage;
