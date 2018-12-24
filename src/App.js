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

  getOilData = (countryCode) => {
    console.log(countryCode);
    axios.get(`https://atlas.media.mit.edu/hs92/export/1998.2015/${countryCode.toLowerCase()}/show/2709/`)
      .then(response => {
        // strip data function here? probably unnecessary
        this.setState({ oilData: response.data.data });
      })
      .catch(error => console.log(error));
  }

  handleClick = (geography, e) => {
    e.preventDefault();
    const country = countries.find(country => country.name === geography.properties.name)
    this.getOilData(country.code);
  }

  render() {
    const { oilData } = this.state;
    return (
      <div>
        <Map handleClick={this.handleClick}/>
        {oilData ? <div>{JSON.stringify(oilData)}</div> : null}
      </div>
    );
  }
}

export default App;
