import React, { Component } from 'react';
import Map from './components/Map';
import Chart from './components/Chart';
import axios from 'axios';
import { csv } from 'd3-fetch';
import './App.css';

class App extends Component {
  state = {
    oilData: null,
    cpi: null,
    countries: null
  }

  async componentDidMount() {
    const cpi = await csv("cpi.csv");
    const countries = await csv("locations_international_atlas.csv");
    axios.get("https://atlas.media.mit.edu/hs92/export/2016/all/show/2709/")
      .then(response => {
        this.setState({ oilData: response.data.data, cpi, countries });
      })
      .catch(error => console.log(error));
  }

  handleClick = (geography, evt) => {
    console.log('Event: ', evt);
    console.log("Geography data: ", geography.properties.name);
  }

  render() {
    const { oilData, cpi, countries } = this.state;

    if (oilData && cpi) {
      return (
        <div>
          <Map handleClick={this.handleClick}/>
          <div>
            {JSON.stringify(oilData)}
          </div>
          <div>
            {cpi.find(x => x.Jurisdiction === "Angola").Jurisdiction}
          </div>
          <div>
            {JSON.stringify(countries)}
          </div>
          <div>
            {JSON.stringify(cpi)}
          </div>
        </div>
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

export default App;
