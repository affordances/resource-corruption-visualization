import React from 'react';
import '../App.css';

const Credits = props => {
  return (
    <div className="credits-container">
      <h5>Data:</h5>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://atlas.media.mit.edu/en/"
        >
          Observatory of Economic Complexity
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://datahub.io/core/corruption-perceptions-index"
        >
          Corruption Perceptions Index
        </a>
      </p>
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/cid-harvard/classifications/blob/cdf935af16a1c0c31833938af1e8444b6387e6ac/location/International/Atlas/out/locations_international_atlas.csv"
        >
          Atlas of Economic Complexity
        </a>
      </p>
    </div>
  )
}

export default Credits;
