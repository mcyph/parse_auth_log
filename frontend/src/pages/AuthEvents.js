import * as dfd from "danfojs/src/index";
import React from "react";

import AuthLogData from "../data/AuthLogData";
import BasicBarChart from "./BasicBarChart";
import { CircularProgress } from "@material-ui/core";
import flagData from "../data/flagData";
import utilityFns from "./utilityFns";

class AuthEvents extends React.Component {
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

      fetch(`http://127.0.0.1:9779/other_events_timeline`)
             .then(res => res.json())
             .then(otherEventsTimeline => {

        // Update the UI
        this.setState({ "otherEventsTimeline": otherEventsTimeline });
      });
    }
  }

  render() {
    if (!this.state.otherEventsTimeline) {
      // Display a progress bar if the data hasn't loaded yet
      return <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>;

    } else {
      //       LoginEvents.eventdatetime,
      //       LoginEvents.type,
      //       LoginEvents.message,

      let otherEventsTimeline = this.state.otherEventsTimeline;
      let out = [];

      for (let otherEvent of otherEventsTimeline) {
        out.push(<li>{ otherEvent['eventdatetime'] } { otherEvent['type'] }<br/>{ otherEvent['message'] }<br/><br/></li>);
      }

      return <>
        <div style={{
          maxWidth: "900px",
          margin: "3rem auto 5rem auto",
          fontSize: "1rem",
          fontFamily: "lucida console",
          color: "#111",
          background: "#eee",
          padding: "1rem",
          boxModel: "border-box"
        }}>
          <ul>
            { out }
          </ul>
        </div>
      </>;
    }
  }
}

export default AuthEvents;
