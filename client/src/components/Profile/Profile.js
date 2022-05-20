import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './profile.css';

const Profile = () => {
  /*const [userData, setUserData] = React.useState({
    username: "kylemo",
    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    linkedAccounts: [{
      platformUserIdentifier: "jogn",
      platform: "xbl"
    }]
  });*/
  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userLogin')));
  //const [playerData, setPlayerData] = React.useState({level: "1,200", kills: "34,000"})
  const [playerData, setPlayerData] = React.useState(null);
  const [selectState, setSelectState] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userLogin')))
  },[location])

  const handleChange = (e) => {
    if(e.target.value){

      setSelectState(e.target.value)

      const username = e.target.value.replace(/\s+/g,'').split("|")[0];
      const platform = e.target.value.replace(/\s+/g,'').split("|")[1];

      fetch(`https://gaming-project.herokuapp.com/api/data/player?platform=${platform}&username=${username}`)
        .then(res => {
          return res.json()
        })
        .then(data => {
          setPlayerData(data)
        })
    } else {
      setPlayerData(null)
    }
  }

  const Dropdown = (props) => {
    const linkedAccounts = userData.linkedAccounts.map((account,index) => {
      return (
        <option className="dropdownOption" key={account.__id} value={account.platformUserIdentifier+"|"+account.platform}>{account.platformUserIdentifier}</option>
      )
    })


    return (
      <form className="profile-linked-select" >
        <select onChange={handleChange} value={selectState} name='linkedAccount' id="linked">
          <option value={""}>Select your account</option>
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
          </div>
        </aside>
        <table>

        </table>
      </div>

    </main>
  )
}

export default Profile;
