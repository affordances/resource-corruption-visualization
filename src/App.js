import React, { Component } from 'react';
import Map from './components/Map';
import Chart from './components/Chart';
import Loading from './components/Loading';
import axios from 'axios';
import countries from './reference/countries';
import nullTotals from './reference/totals';
import './App.css';

class App extends Component {
  state = {
    oilData: null,
    corruptionData: null,
    countryName: null,
    loading: false
  }

  handleClick = async (geography, e) => {
    e.preventDefault();
    const country = countries.find(country => country["name"] === geography["properties"]["name"]);
    if (country === undefined || country["code"] === undefined) { return; }
    await this.setState({ loading: true });
     // need error message here
    const corruptionData = this.normalize(country["years"]);
    const countryName = country["name"];
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${country["code"].toLowerCase()}/show/2709/`)
      .then(response => {
        const oilData = this.totalExportValues(response.data.data);
        this.setState({ oilData, corruptionData, countryName, loading: false });
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

  normalize = (dataObj) => {
    let obj = {};
    Object.entries(dataObj).forEach(([key, value]) => {
      if (key >= 1998 && key <= 2011 && value !== null) {
        obj[key] = (value * 10);
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }

  render() {
    const { oilData, corruptionData, countryName, loading } = this.state;
    return (
      <div className="container">
        <Map handleClick={this.handleClick}/>
        {loading ? <Loading /> : null}
        {
          oilData && corruptionData && !loading ?
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
