import * as dfd from "danfojs/src/index";
import React from "react";

import CovidData from "../data/AuthLogData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import flagData from "../data/flagData";
import utilityFns from "./utilityFns";

class ByUser extends React.Component {
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

      CovidData.getLoginEvents().then(df => {
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

      let df2 = df.groupby(["username"]).col(["username"]).count();
      df2 = df2.sort_values({ "by": "username_count", "ascending": false })
      let valuesOut1 = utilityFns.getTwoTuples(df2, "username", "username_count");

      return <>
        <BasicBarChart
          xAxisType={ BasicBarChart.AXIS_TYPE.CATEGORY }
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
          dataZoom={[
            {
              show: true,
              type: "slider",
              moveHandleSize: 20,
              moveHandleStyle: {
                opacity: 0.3
              },
              start: 0,
              end: utilityFns.isMobile() ? 2 : 2
            }, {
              type: "inside"
            }
          ]}
          style={{
            height: utilityFns.isMobile() ? "calc(66vh)" : "calc(50vh - 33px)",
            marginTop: "25px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1000px"
          }}
          data={ [["Attempts by Username", valuesOut1, ""]] }
        />
      </>;
    }
  }
}

export default ByUser;
