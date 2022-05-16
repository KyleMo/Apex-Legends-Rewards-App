import React from 'react'
import './profile.css'
import {useNavigate} from 'react-router-dom'

const Profile = () => {

  const [userData, setUserData] = React.useState(JSON.parse(localStorage.getItem('userLogin')));
  //const navigate = useNavigate();

  return(
    <main className="profile">
      {userData ? <h1 className="profile-page-disclaimer">Welcome back {userData.username}!</h1> : <h1>Please log in</h1>}
    </main>
  )
}

export default Profile;
