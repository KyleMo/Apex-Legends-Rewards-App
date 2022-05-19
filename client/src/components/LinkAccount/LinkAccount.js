import './styles.css';
import React from 'react';
import Searchbar from '../Homepage/Searchbar.js'
import Loading from '../Homepage/Loading.js'
import ErrorMessage from '../Homepage/ErrorMessage.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const LinkAccount = () => {

  const navigate = useNavigate();
  const [searchedPlayerData, setSearchPlayerData] = React.useState(null)
  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userLogin')))
  const [linkedData, setLinkedData] = React.useState({
    platformUserIdentifier: "",
    platform: ""
  })
  const [validInput, setValidInput] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [displayErrorMessage, setErrorMessage] = React.useState(false);
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
      fetch(`https://gaming-project.herokuapp.com/api/data/player?platform=${linkedData.platform}&username=${linkedData.platformUserIdentifier}`)
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
            console.log("No gamertag returned");
            setError("Please select the correct platform and enter a valid username")
          }

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
      {displayErrorMessage && <ErrorMessage />}
    </main>
  )
}

export default LinkAccount;
