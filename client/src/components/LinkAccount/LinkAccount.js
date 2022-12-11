import './styles.css';
import React from 'react';
import Searchbar from '../Homepage/Searchbar.js'
import Loading from '../Homepage/Loading.js'
import Error from '../Error/Error.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LinkAccount = () => {

  const navigate = useNavigate();
  const userData = React.useState(JSON.parse(localStorage.getItem('userLogin')))
  const [linkedData, setLinkedData] = React.useState({
    platformUserIdentifier: "",
    platform: ""
  })
  const [validInput, setValidInput] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false)

  const handleChangeText = (e) => {
    setLinkedData(prev => {
      return(
        {
          ...prev,
          [e.target.name]: e.target.value
        }
      )
    })
  }

  const handleChangeImg = (event) => {
    const value = event.currentTarget.value;
    setLinkedData(prev => {
      return {
        ...prev,
        platform: value
      }
    })
  }

  const handleSubmit = async (event) => {
    if(linkedData.platform !== "" && linkedData.platformUserIdentifier !== ""){
      setValidInput(true);
      setLoading(true);
      fetch(`/api/data/player?platform=${linkedData.platform}&username=${linkedData.platformUserIdentifier}`)
        .then(res => {
          return res.json()
        })
        .then(async data => {
          if(data.gamertag){
             try {
              const config = {
                headers: {
                  "Content-type": "application/json"
                }
              }

              const { data } = await axios.post('/api/users/linkaccount', {...userData, ...linkedData}, config)
              localStorage.setItem('userLogin', JSON.stringify(data))
              setLoading(false)
              navigate('/profile')


            } catch (e) {
              setLoading(false)
              setError(e.response.data.message)
            }

          } else {
            setLoading(false)
            setError("No gamertag returned")
          }

        })
        .catch(e => {
          setError("Unable to verify existence of gaming account")
        })
    } else {
      setValidInput(false);
    }

}


  return (
    <main className="linkAccount">
      <h1>Link your account to your profile to start earning rewards!</h1>
      <Searchbar handleChangeText={handleChangeText} handleChangeImg={handleChangeImg} searchData={linkedData} getData={handleSubmit}/>
      {loading && <Loading />}
      {!validInput && <p>Please select a platform and ensure your username is entered correctly.</p>}
      {error && <div className="login-error"><Error message={error}/></div>}
    </main>
  )
}

export default LinkAccount;
