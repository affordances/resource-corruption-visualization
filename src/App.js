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
    const country = countries.find(country => country.name === geography.properties.name)
    this.getOilData(country.code.toLowerCase());
  }

  getOilData = (countryCode) => {
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${countryCode}/show/2709/`)
      .then(response => {
        this.setState({ oilData: response.data.data });
      })
      .catch(error => console.log(error));
  }

  totalExportValue = (arr) => {
    // make array of objects, year: totalExportValue
    // let total = 0;
    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i].import_val) {
    //     total += arr[i].import_val;
    //   }
    // }
    // return total;
  }

  render() {
    const { oilData } = this.state;
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
