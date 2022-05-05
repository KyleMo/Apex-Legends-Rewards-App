import React from 'react';
import styles from './homepage.css'
import Searchbar from './Searchbar.js'
import MatchesTable from './MatchesTable.js'
import ErrorMessage from './ErrorMessage.js'
import apexImage from '../../images/apexImage.jpg'
import axios from 'axios';



const Homepage = () => {

  const [searchData, setSearchData] = React.useState({
    platform: "",
    platformUserIdentifier: ""
  })
  const [displayTable, setDisplayTable] = React.useState(false)
  const [displayErrorMessage, setErrorMessage] = React.useState(false)
  const [matches, setMatches] = React.useState([])
  const [validInput, setValidInput] = React.useState(true);


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

  const parseDate = (dateString) => {
    const dateArr = dateString.slice(0,10).split("-")
    return `${dateArr[1].slice(1)}/${dateArr[2].slice(1)}/${dateArr[0].slice(-2)}`
  }

  const getData = async () => {
    if(searchData.platform !== "" && searchData.platformUserIdentifier !== ""){
      setValidInput(true);
      const response = await fetch(`http://localhost:8080/data?platform=${searchData.platform}&username=${searchData.platformUserIdentifier}`);
      const json = await response.json()
      if(json.code === "ERR_BAD_REQUEST"){
        await console.log(`Request failed with a status code ${json.status}`);
        await setErrorMessage(true)
        await setDisplayTable(false)
      } else {
        await console.log("Request successful");
        await setMatches(json);
        await setErrorMessage(false)
        await setDisplayTable(true)
      }
    } else {
      setValidInput(false);
    }
  }

//each match will be a row appended to a table
const displayMatchRows = matches.map((match,index) => {

  //dummy data
  function checkRewardAvailability(match){
    const value = Math.random()
    if (value <= .5) {
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
      <td>{checkRewardAvailability()?<button className="reward-button">Claim Reward</button>:""}</td>
    </tr>
  )
})

  return (
    <section className={displayTable?"main-content-2":"main-content-1"}>
        <h1 className="hero">Play Apex Legends and get rewarded!</h1>
        <p className="instructions">Select your platform (ex: Origin) then type in your username (ex: chaoticbutpc).</p>
        <Searchbar
          handleChangeImg = {handleChangeImg}
          handleChangeText = {handleChangeText}
          searchData = {searchData}
          getData = {getData}
        />
        {!validInput && <p>Please select a platform and ensure your username is entered correctly.</p>}
        {displayErrorMessage && <ErrorMessage />}
        {displayTable && <MatchesTable rowData={displayMatchRows} handleCloseClick={handleCloseClick}/>}
    </section>

  )
}

export default Homepage;