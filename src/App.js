import React, { Component } from "react";
import Octicon, { MarkGithub } from "@githubprimer/octicons-react";
import GetStarted from "./components/GetStarted";
import Map from "./components/Map";
import Chart from "./components/Chart";
import Loading from "./components/Loading";
import NoData from "./components/NoData";
import Credits from "./components/Credits";
import axios from "axios";
import countries from "./reference/countries";
import nullTotals from "./reference/totals";
import "./App.css";

class App extends Component {
  state = {
    oilData: null,
    corruptionData: null,
    countryName: null,
    loading: false,
    noData: false,
  };

  handleClick = async (geography, e) => {
    e.preventDefault();
    const country = countries.find(
      (country) => country["name"] === geography["properties"]["name"]
    );
    if (country === undefined) {
      await this.setState({
        oilData: null,
        corruptionData: null,
        countryName: geography["properties"]["name"],
        noData: true,
      });
      return;
    }
    await this.setState({ noData: false, loading: true });
    const corruptionData = this.normalize(country["years"]);
    const countryName = country["name"];
    axios
      .get(
        `https://oec.world/hs92/export/1998.2015/${country[
          "code"
        ].toLowerCase()}/show/2709/`
      )
      .then((response) => {
        const oilData = this.totalExportValues(response.data.data);
        this.setState({ oilData, corruptionData, countryName, loading: false });
      })
      .catch((error) => console.log(error));
  };

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
  };

  makeArray = (dataObj) => {
    let arr = [];
    Object.entries(dataObj).forEach(([key, value]) => {
      arr.push(value);
    });
    return arr;
  };

  normalize = (dataObj) => {
    let obj = {};
    Object.entries(dataObj).forEach(([key, value]) => {
      if (key >= 1998 && key <= 2011 && value !== null) {
        obj[key] = value * 10;
      } else {
        obj[key] = value;
      }
    });
    return obj;
  };

  render() {
    const {
      oilData,
      corruptionData,
      countryName,
      loading,
      noData,
    } = this.state;

    let content;
    if (loading) {
      content = <Loading />;
    } else if (noData) {
      content = <NoData country={countryName} />;
    } else if (oilData && corruptionData) {
      content = (
        <Chart
          oilData={this.makeArray(oilData)}
          corruptionData={this.makeArray(corruptionData)}
          countryName={countryName}
        />
      );
    } else {
      content = <GetStarted />;
    }

    return (
      <div className="container">
        <div className="header-container">
          <div className="title-container">
            <div className="title">
              <h1>Oil and corruption</h1>
              <h5>a visualization by gabriel duquette</h5>
            </div>
          </div>
          <Credits />
        </div>
        <div className="content-container">
          <Map handleClick={this.handleClick} />
          {content}
        </div>
        <div className="footer-container">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/affordances/resource-corruption-visualization"
          >
            <Octicon icon={MarkGithub} size="medium" ariaLabel="GitHub" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
