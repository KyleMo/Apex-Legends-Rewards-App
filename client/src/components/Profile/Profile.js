
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './profile.css';

const Profile = () => {

  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userLogin')));
  const [playerData, setPlayerData] = React.useState(null);
  const [selectState, setSelectState] = React.useState("");
  const [matches, setMatches] = React.useState([])
  const location = useLocation();


  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userLogin')))
  },[location])

  const handleChange = async (e) => {
    if(e.target.value){

      setSelectState(e.target.value)

      const username = e.target.value.replace(/\s+/g,'').split("|")[0];
      const platform = e.target.value.replace(/\s+/g,'').split("|")[1];

      //get player gamertag
      const responseUserData = await fetch(`http://localhost:8080/api/data/player?platform=${platform}&username=${username}`)
      const userDataJSON = await responseUserData.json()
      setPlayerData(userDataJSON)

      //get player matches
      const responseMatchesData = await fetch(`http://localhost:8080/api/data/sessions?platform=${platform}&username=${username}`)
      const matchesDataJSON = await responseMatchesData.json()
      setMatches(matchesDataJSON)

    } else {
      setPlayerData(null)
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

  const displayRow = matches.map((match, index) => {
    function checkRewardAvailability(match){
      return match.data.stats?.kills?.value >= 5 ? true : false
    }

    return (
      <tr key={match.data?.id}>
        <td>{index+1}</td>
        <td>{parseDate(match.data.metadata?.endDate?.value)}</td>
        <td>{match.data.stats?.kills?.value}</td>
        <td>{match.data.stats?.rankScore?.value}</td>
        <td>{checkRewardAvailability(match)?<button className="reward-button">Claim Reward</button>:""}</td>
      </tr>
    )
  })


//Custom drop down selection
  const Dropdown = (props) => {
    const linkedAccounts = userData.linkedAccounts.map((account,index) => {
      return (
        <option className="dropdownOption" key={account.__id} value={account.platformUserIdentifier+"|"+account.platform}>{account.platformUserIdentifier}</option>
      )
    })


    return (
      <form className="profile-linked-select" >
        <select onChange={handleChange} value={selectState} name='linkedAccount' id="linked">
          {selectState === "" && <option value={""}>Select your account</option>}
          {linkedAccounts}
        </select>
      </form>
    )
  }

  return(
    <main className="profile">
      <div className="profile-container">
        <aside className="profile-details">
          <div className="profile-info-container">
            {userData && <img className="profile-pic" src={userData.pic}></img>}
            {userData && <h1 className="profile-username">{userData.username}</h1>}
            {(userData && userData.linkedAccounts.length != 0) && <Dropdown linkedAccounts={userData.linkedAccounts}/>}
            {(userData && userData.linkedAccounts.length >=1) ? <Link to='/link-account'>Link another account</Link> : <Link to='/link-account'>Link a gaming account</Link>}
          </div>
          <div className="profile-data-container">
            {playerData && <h3>{`Level: ${playerData.level}`}</h3>}
            {playerData && <h3>{`Kills: ${playerData.kills}`}</h3>}
            {playerData && <h3>{`Rank Score: ${playerData.rankScore}`}</h3>}
          </div>
        </aside>
        <div className="profile-table-container">
          <table className="profile-matches-table">
              <thead>
                <tr>
                  <th>Match</th>
                  <th>Match Date</th>
                  <th>Kills</th>
                  <th>Rank Score</th>
                  <th>Reward</th>
                </tr>
              </thead>
            <tbody>{displayRow}</tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default Profile;
