import React, { Component } from 'react';
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
    axios.get("https://atlas.media.mit.edu/hs92/export/2016/ago/show/2709/")
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

  render() {
    if (this.state.cpi) { console.log(this.state.cpi.find(x => x.Jurisdiction === "Angola").Jurisdiction); }
    if (this.state.oilData) {
      return (
        <div>
          <div>
            {this.totalExportValue(this.state.oilData)}
          </div>
          <div>
            {JSON.stringify(this.state.oilData)}
          </div>
          <div>
            {this.state.cpi.find(x => x.Jurisdiction === "Angola").Jurisdiction}
          </div>
          <div>
            {JSON.stringify(this.state.cpi)}
          </div>
        </div>
      );
    }

    return (
      <div>Loading...</div>
    )
  }
}

export default App;
