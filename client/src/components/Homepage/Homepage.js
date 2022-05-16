import React from 'react'
import styles from './homepage.css'
import Searchbar from './Searchbar.js'
import MatchesTable from './MatchesTable.js'
import ErrorMessage from './ErrorMessage.js'
import Loading from './Loading.js'
import apexImage from '../../images/apexImage.jpg'
import axios from 'axios';

const Homepage = () => {


  const [userData,setUserData] = React.useState(localStorage.getItem('userLogin'))


  const [searchData, setSearchData] = React.useState({
    platform: "",
    platformUserIdentifier: ""
  })
  const [displayTable, setDisplayTable] = React.useState(false)
  const [displayErrorMessage, setErrorMessage] = React.useState(false)
  const [matches, setMatches] = React.useState([])
  const [validInput, setValidInput] = React.useState(true);
  const [loading, setLoading] = React.useState(false)

//Handling functions

  const handleCloseClick = () => {
    setDisplayTable(false)
  }

  const handleChangeText = (event) => {
    const value = event.target.value;
    setSearchData(prev => {
      return {
        ...prev,
        platformUserIdentifier: value
      }
    })
  }

  const handleChangeImg = (event) => {
    const value = event.currentTarget.value;
    setSearchData(prev => {
      return {
        ...prev,
        platform: value
      }
    })
  }

  const getData = () => {
    if(searchData.platform !== "" && searchData.platformUserIdentifier !== ""){
      setValidInput(true);
      setLoading(true);
      fetch(`http://localhost:8080/data?platform=${searchData.platform}&username=${searchData.platformUserIdentifier}`)
        .then(res => {
          return res.json()
        })
        .then(data => {
          finishAllOperations(data);
        })
    } else {
      console.log("Made it into the errors")
      setValidInput(false);
    }
  }


function finishAllOperations(json) {
  if(json.code === "ERR_BAD_REQUEST"){
    console.log(`Request failed with a status code ${json.status}`);
    setErrorMessage(true);
    setDisplayTable(false);
    setLoading(false);
  } else {
    setMatches(json);
    setErrorMessage(false);
    setDisplayTable(true)
    setLoading(false);
  }
}



const parseDate = (dateString) => {
  const dateArr = dateString.slice(0,10).split("-")
  let day, month;
  if(dateArr[0] >= 10){
    day = dateArr[2]
  } else {
    day = dateArr[2].slice(1)
  }
  if(dateArr[1] >= 10){
    month = dateArr[1];
  } else {
    month = dateArr[1].slice(1);
  }
  return `${month}/${day}/${dateArr[0].slice(-2)}`
}


const displayMatchRows = matches.map((match,index) => {

  //dummy data to populate if reward is available
  function checkRewardAvailability(matchData){

    if (matchData.stats.kills.value >= 5) {
      return true
    } else {
      return false
    }
  }

  return (
    <tr key={match.id}>
      <td>{index+1}</td>
      <td>{parseDate(match.metadata.endDate.value)}</td>
      <td>{match.stats.kills.value}</td>
      <td>{match.stats.rankScore.value}</td>
      <td>{checkRewardAvailability(match)?<button className="reward-button">Claim Reward</button>:""}</td>
    </tr>
  )
})

  return (
    <main className="main-content-1">
        <h1 className="hero">Play Apex Legends and get rewarded!</h1>
        <p className="instructions">Select your platform (ex: Origin) then type in your username (ex: chaoticbutpc).</p>
        <Searchbar
          handleChangeImg = {handleChangeImg}
          handleChangeText = {handleChangeText}
          searchData = {searchData}
          getData = {getData}
        />
        {loading && <Loading />}
        {!validInput && <p>Please select a platform and ensure your username is entered correctly.</p>}
        {displayErrorMessage && <ErrorMessage />}
        {displayTable && <MatchesTable rowData={displayMatchRows} handleCloseClick={handleCloseClick}/>}
    </main>
  )
}

export default Homepage;
