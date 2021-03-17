import * as dfd from "danfojs/src/index";
import React from "react";

import AuthLogData from "../data/AuthLogData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import flagData from "../data/flagData";
import utilityFns from "./utilityFns";

class ByHour extends React.Component {
  state = {}

  /**
   *
   * @param name the printable name
   * @param color the color of the bar chart items
   */
  constructor({ name, color }) {
    super({ name, color });

    if (!this.state.dfLoading) {
      // Load the data in the background
      this.setState({ "dfLoading": true });

      AuthLogData.getLoginEvents().then(df => {
        df.addColumn({
          column: "hour",
          value: df['eventdatetime'].values.map(item => {return parseInt(item.split('T')[1].split(':')[0])})
        });

        // Update the UI
        this.setState({ "df": df });
      });
    }
  }

  render() {
    if (!this.state.df) {
      // Display a progress bar if the data hasn't loaded yet
      return <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>;

    } else {
      // Otherwise show the bar chart
      let df = this.state.df;

      // Danfo.js mangles dates :S
      let count = {};
      for (let [date,] of utilityFns.getTwoTuples(df, "hour", "hour")) {
        count[date] = count[date] || 0;
        count[date] += 1;
      }
      let out = [];
      for (let date in count) {
        out.push([date, count[date]]);
      }
      out.sort();

      return <>
        <BasicBarChart
          xAxisType={ BasicBarChart.AXIS_TYPE.VALUE }
          xAxisLabelRotate={ 60 }
          xAxisLabelRich={ this.__richProps }
          xAxisMargin={ 11 }
          yAxisType={ BasicBarChart.AXIS_TYPE.VALUE }
          gridStyle={{
            top: "40px",
            bottom: "100px",
            left: "90px",
            right: "30px"
          }}
          style={{
            height: utilityFns.isMobile() ? "calc(66vh)" : "calc(50vh - 33px)",
            marginTop: "25px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1000px"
          }}
          data={ [["Attempts by Hour", out, ""]] }
        />
      </>;
    }
  }
}

export default ByHour;
