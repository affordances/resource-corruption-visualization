import React, { Component } from 'react';
import Map from './components/Map';
import Chart from './components/Chart';
import axios from 'axios';
import countries from './reference/countries';
import './App.css';

class App extends Component {
  state = {
    oilData: null
  }

  handleClick = (geography, e) => {
    e.preventDefault();
    const country = countries.find(country => country["name"] === geography["properties"]["name"]);
    if (country === undefined || country["code"] === undefined) { return; }
    this.getOilData(country["code"].toLowerCase());
  }

  getOilData = (countryCode) => {
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${countryCode}/show/2709/`)
      .then(response => {
        this.setState({ oilData: response.data.data });
      })
      .catch(error => console.log(error));
  }

  totalExportValues = (oilData) => {
    // totals are wrong, debug
  }

  render() {
    const { oilData } = this.state;
    return (
      <div>
        <Map handleClick={this.handleClick}/>
        {
          oilData ?
            <div>
              {/* {this.totalExportValues(oilData).map(year => {
                return <div>{year["year"]}: {year["total"]}</div>
              })} */}
            {JSON.stringify(oilData)}
          </div>
          : null
        }
      </div>
    );
  }
}

export default App;
