import React from "react";

import CovidData from "../data/CovidData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import utilityFns from "./utilityFns";

class World extends React.Component {
  state = {}

  /**
   * A single chart (one of confirmed/recovered/deaths)
   * displaying stats on a world regional level
   *
   * @param name the printable name, e.g. "Confirmed"
   * @param apiKey the api endpoint name, e.g. "confirmed"
   * @param color the color of the bar chart items
   */
  constructor({ name, apiKey, color }) {
    super({ name, apiKey, color });

    if (!this.state.dfLoading) {
      // Load the data in the background
      this.setState({ "dfLoading": true });

      CovidData.getDetailedStats(apiKey).then(df => {
        // We're only interested in these properties,
        // so reduce to only them to increase performance
        df = utilityFns.reduceToOnlyCols(
            df, [this.props.apiKey, "Population", "Region"]
        )

        df = df.fillna({ "values": 0 })

        // Group by geographic region
        // e.g. "East Asia and Pacific" etc
        df = df.groupby(["Region"])

        // Update the UI
        this.setState({ df: df });
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
      let column = this.props.apiKey;
      let df = this.state.df;

      df = df.col([column]).sum();
      let mapper = {};
      mapper[column+"_sum"] = column;
      df.rename({ "mapper": mapper, "inplace": true });

      // Sort the values in a descending order
      df = df.sort_values({ "by": column, "ascending": false })

      // Convert to arrays of [[column, value], ...]
      let valuesOut = utilityFns.getTwoTuples(df, "Region", column);

      return <>
        <BasicBarChart
          xAxisType={ BasicBarChart.AXIS_TYPE.CATEGORY }
          xAxisLabelRich={ this.__richProps }
          xAxisMargin={ 20 }
          xAxisLabelRotate={ utilityFns.isMobile() ? 60 : 0 }
          yAxisType={ BasicBarChart.AXIS_TYPE.VALUE }
          gridStyle={{
            top: "40px",
            bottom: utilityFns.isMobile() ? "180px" : "40px",
            left: "90px",
            right: "30px"
          }}
          style={{
            height: utilityFns.isMobile() ? "calc(66vh)" : "calc(38vh - 33px)",
            marginTop: "25px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1000px"
          }}
          data={ [[this.props.name, valuesOut, this.props.color]] }
        />
      </>;
    }
  }
}

export default World;
