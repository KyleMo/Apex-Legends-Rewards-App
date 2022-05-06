import React from 'react';
import './errormessage.css'

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <p>Unfortunately, we are unable to find this account. Please ensure you have selected the correct platform and entered the correct username. If you haven't played in over a year, your data may not be available.</p>
    </div>
  )
}

export default ErrorMessage;
