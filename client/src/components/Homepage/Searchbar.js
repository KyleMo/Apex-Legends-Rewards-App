import React from 'react';
import './searchbar.css'
import origin from '../../images/origin.svg';
import psn from '../../images/ps4.svg';
import xbl from '../../images/xbox.svg';

const Searchbar = (props) => {

  return (
    <form className="userInputForm">
      <div className="platformIconButtons">
        <button onClick={props.handleChangeImg} className={props.searchData.platform==="psn"?"platform-icon-btn-dark" : "platform-icon-btn"} id="psn" value="psn" type="button" name="PlayStation Network">
          <img src={psn} value="psn" alt="PSN"></img>
        </button>
        <button onClick={props.handleChangeImg} className={props.searchData.platform==="xbl"?"platform-icon-btn-dark" : "platform-icon-btn"} id="xbl" value="xbl" type="button" name="Xbox">
          <img src={xbl} value="xbl" alt="XBOX"></img>
        </button>
        <button onClick={props.handleChangeImg} className={props.searchData.platform==="origin"?"platform-icon-btn-dark" : "platform-icon-btn"} id="origin" value="origin" type="button" name="Origin">
          <img src={origin} value="origin" alt="ORIGIN"></img>
        </button>
      </div>
      <input onChange={props.handleChangeText} id="gamerTag" className="input" type="text" name="platformUserIdentifier" placeholder="Enter PlayStation Network ID"></input>
      <button onClick={props.getData} id="submit-search" type="button" name="button">Submit</button>
    </form>
  )
}

export default Searchbar;
