import React from "react";

import CovidData from "../data/CovidData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import flagData from "../data/flagData";
import utilityFns from "./utilityFns";

class Countries extends React.Component {
  state = {}

  /**
   * A single chart (one of confirmed/recovered/deaths)
   * displaying stats on a country (admin 0) level
   *
   * @param name the printable name, e.g. "Confirmed"
   * @param apiKey the api endpoint name, e.g. "confirmed"
   * @param color the color of the bar chart items
   * @param per100k whether to display per 100k inhabitants
   *                (per capita values)
   */
  constructor({ name, apiKey, color, per100k }) {
    super({ name, apiKey, color, per100k });

    if (!this.state.dfLoading) {
      // Load the data in the background
      this.setState({ "dfLoading": true });

      CovidData.getDetailedStats(apiKey).then(df => {

        // Set the country flag icon properties here
        // so we don't have to do it each time in render()
        let richProps = this.__richProps = {};
        const REPLACE_RE = /[ '(),-]/g;
        let countryRegionValues = df['countryRegion'].values
        let iso2Values = df['iso2'].values;

        for (let x=0; x<countryRegionValues.length; x++) {
          let countryRegion = countryRegionValues[x];
          let iso2 = iso2Values[x];

          richProps[countryRegion.replace(REPLACE_RE, '_')] = {
            width: 24,
            height: 24,
            align: 'center',
            backgroundColor: {
              image: "data:image/png;base64," + flagData[iso2]
            }
          };
        }

        // We're only interested in some of the properties at any
        // one time, so reduce to only those to increase performance
        df = utilityFns.reduceToOnlyCols(
          df, [this.props.apiKey, "Population", "countryRegion"]
        )

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
      let column = this.props.apiKey;
      let df = this.state.df;

      if (this.props.per100k) {
        // Show per capita values
        df.addColumn({
          column: "derived",
          value: df[column].mul(100000)
                           .div(df['Population'])
        });
        df = df.drop({
          "columns": [column],
          "axis": 1
        }).rename({
          "mapper": { "derived": column }
        });
      }

      // We'll fill null/NaN's for now so we don't get errors,
      // but note this could have an effect on averages if we
      // want to show them later!
      df = df.fillna({ "values": 0 })

      // Some countries like the US and the UK have data provided
      // by province/state but not country-wide, so we need to
      // add this data up by aggregating it
      // TODO: Add validation to make sure this isn't performed for
      //  countries which have higher-level data (if it exists)
      df = df.groupby(["countryRegion"])
             .col([column])
             .sum();
      let mapper = {};
      mapper[column+"_sum"] = column;
      df.rename({ "mapper": mapper, "inplace": true });

      // Sort the values in a descending order
      df = df.sort_values({ "by": column, "ascending": false })

      // Convert to arrays of [[column, value], ...]
      let valuesOut = utilityFns.getTwoTuples(df, "countryRegion", column);

      return <>
        <BasicBarChart
          xAxisType={ BasicBarChart.AXIS_TYPE.CATEGORY }
          xAxisLabelRotate={ 60 }
          xAxisLabelRich={ this.__richProps }
          xAxisMargin={ 11 }
          yAxisType={ BasicBarChart.AXIS_TYPE.VALUE }
          gridStyle={{
            top: "40px",
            bottom: "200px",
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
              end: utilityFns.isMobile() ? 5 : 11
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
          data={ [[this.props.name, valuesOut, this.props.color]] }
        />
      </>;
    }
  }
}

export default Countries;
