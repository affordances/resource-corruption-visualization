import React from 'react';
import '../App.css';

const NoData = props => {
  return (
    <div className="no-data-container">
      <p>Sorry, no data available from</p>
      <h1>{props.country}</h1>
      <p>¯\_(ツ)_/¯</p>
    </div>
  )
}

export default NoData;
