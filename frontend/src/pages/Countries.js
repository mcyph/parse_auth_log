import React from "react";

import AuthLogData from "../data/AuthLogData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import flagData from "../data/flagData";
import utilityFns from "./utilityFns";

class Countries extends React.Component {
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

        // Set the country flag icon properties here
        // so we don't have to do it each time in render()
        let richProps = this.__richProps = {};
        const REPLACE_RE = /[ '(),-]/g;

        for (let iso2 in flagData) {
          richProps[iso2] = {
            width: 24,
            height: 24,
            align: 'center',
            backgroundColor: {
              image: "data:image/png;base64," + flagData[iso2]
            }
          };
        }


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

      let df2 = df.query({ "column": "type", "is": "==", "to": 2 })
                  .groupby(["country_code"]).col(["country_code"]).count();
      df2 = df2.sort_values({ "by": "country_code_count", "ascending": false })
      let valuesOut1 = utilityFns.getTwoTuples(df2, "country_code", "country_code_count");

      let df3 = df.query({ "column": "type", "is": "==", "to": 1 })
                  .groupby(["country_code"]).col(["country_code"]).count();
      df3 = df3.sort_values({ "by": "country_code_count", "ascending": false })
      let valuesOut2 = utilityFns.getTwoTuples(df3, "country_code", "country_code_count");

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
          style={{
            height: utilityFns.isMobile() ? "calc(66vh)" : "calc(50vh - 33px)",
            marginTop: "25px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1000px"
          }}
          data={ [["Successful attempts", valuesOut1, ""],
                  ["Failed attempts", valuesOut2, "orange"]] }
        />
      </>;
    }
  }
}

export default Countries;
