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
     // need error message here
    this.getOilData(country["code"].toLowerCase());
  }

  getOilData = (countryCode) => {
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${countryCode}/show/2709/`)
      .then(response => {
        const oilData = this.totalExportValues(response.data.data);
        this.setState({ oilData });
      })
      .catch(error => console.log(error));
  }

  totalExportValues = (oilData) => {
    let totals = {};
    for (let i = 0; i < oilData.length; i++) {
      const currentObj = oilData[i];
      if (currentObj.export_val && !totals[currentObj["year"]]) {
        totals[currentObj["year"]] = currentObj.export_val;
      } else if (currentObj.export_val) {
        totals[currentObj["year"]] += currentObj.export_val;
      }
    }
    return totals;
  }

  render() {
    const { oilData } = this.state;
    if (oilData) { console.log(this.totalExportValues(oilData)); }
    return (
      <div>
        <Map handleClick={this.handleClick}/>
        {
          oilData ?
            <div>
              {JSON.stringify(oilData)}
            </div>
          : null
        }
      </div>
    );
  }
}

export default App;
