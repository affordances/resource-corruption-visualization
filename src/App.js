import React, { Component } from 'react';
import Map from './Map';
import axios from 'axios';
import { csv } from 'd3-fetch';
import './App.css';

class App extends Component {
  state = {
    oilData: null,
    cpi: null
  }

  async componentDidMount() {
    const cpi = await csv("cpi.csv");
    axios.get("https://atlas.media.mit.edu/hs92/export/2016/all/show/2709/")
      .then(response => {
        this.setState({ oilData: response.data.data, cpi });
      })
      .catch(error => console.log(error));
  }

  totalExportValue = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].export_val) {
        total += arr[i].export_val;
      }
    }
    return total;
  }

  handleClick(geography, evt) {
    console.log('Event: ', evt);
    console.log("Geography data: ", geography.properties.name);
  }

  render() {
    const { oilData, cpi } = this.state;

    if (oilData && cpi) {
      return (
        <div>
          <Map handleClick={this.handleClick}/>
          <div>
            {this.totalExportValue(oilData)}
          </div>
          <div>
            {JSON.stringify(oilData)}
          </div>
          <div>
            {cpi.find(x => x.Jurisdiction === "Angola").Jurisdiction}
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
