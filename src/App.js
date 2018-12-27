import React, { Component } from 'react';
import Map from './components/Map';
import Chart from './components/Chart';
import axios from 'axios';
import countries from './reference/countries';
import nullTotals from './reference/totals';
import './App.css';

class App extends Component {
  state = {
    oilData: null,
    corruptionData: null,
    countryName: null
  }

  handleClick = (geography, e) => {
    e.preventDefault();
    const country = countries.find(country => country["name"] === geography["properties"]["name"]);
    if (country === undefined || country["code"] === undefined) { return; }
     // need error message here
    const corruptionData = country["years"];
    const countryName = country["name"];
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${country["code"].toLowerCase()}/show/2709/`)
      .then(response => {
        const oilData = this.totalExportValues(response.data.data);
        this.setState({ oilData, corruptionData, countryName });
      })
      .catch(error => console.log(error));
  }

  totalExportValues = (oilData) => {
    let totals = { ...nullTotals };
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

  makeArray = (dataObj) => {
    let arr = [];
    Object.entries(dataObj).forEach(([key, value]) => {
      arr.push(value);
    });
    return arr;
  }

  render() {
    const { oilData, corruptionData, countryName } = this.state;
    return (
      <div>
        <Map handleClick={this.handleClick}/>
        {
          oilData && corruptionData ?
            <Chart
              oilData={this.makeArray(oilData)}
              corruptionData={this.makeArray(corruptionData)}
              countryName={countryName}
            />
          : null
        }
      </div>
    );
  }
}

export default App;
