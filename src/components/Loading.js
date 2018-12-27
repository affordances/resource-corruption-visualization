import React from 'react';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import '../App.css';

const override = css`
  display: block;
  border: none;
`;

const Loading = props => {
  return (
    <div className="loading-container">
      <p>Fetching data...</p>
      <BarLoader
        className={override}
        sizeUnit={"px"}
        size={150}
        color={'#36D7B7'}
      />
    </div>
  )
}

export default Loading;
