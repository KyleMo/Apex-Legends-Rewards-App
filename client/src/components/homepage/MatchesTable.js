import React from 'react';
import './matchestable.css'

const MatchesTable = (props) => {


  return (
    <div className="table-container">
      <div onClick={props.handleCloseClick} className="close-button">&#10006;</div>
      <table className="matches-table">
        <thead>
          <tr>
            <th>Match</th>
            <th>Match Date</th>
            <th>Kills</th>
            <th>Rank Score</th>
            <th>Reward</th>
          </tr>
        </thead>
        <tbody>{props.rowData}</tbody>
      </table>
    </div>
  )
}

export default MatchesTable;
