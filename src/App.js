import React, { Component } from 'react';
import axios from 'axios';
import { csv } from 'd3-fetch';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';
import './App.css';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

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

  handleClick(geography, evt) {
    console.log("Geography data: ", geography.properties.name);
  }

  render() {
    const { oilData, cpi } = this.state;

    if (oilData && cpi) {
      return (
        <div>
          <div style={wrapperStyles}>
            <ComposableMap
              projectionConfig={{
                scale: 205,
                rotation: [-11,0,0],
              }}
              width={980}
              height={551}
              style={{
                width: "100%",
                height: "auto",
              }}
              >
              <ZoomableGroup center={[0,20]} disablePanning>
                <Geographies geography="/world-50m.json">
                  {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      projection={projection}
                      onClick={this.handleClick}
                      style={{
                        default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: "#607D8B",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: {
                          fill: "#FF5722",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  ))}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
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
