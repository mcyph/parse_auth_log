import * as dfd from "danfojs/src/index";

class AuthLogData {
  getOtherEventsTimeline=()=>{
    return new Promise(resolve => {
      if (this.__otherEventsTimeline) {
        return this.__otherEventsTimeline;
      } else {
        fetch(process.env.REACT_APP_BACKEND_ADDRESS + `/other_events_timeline`)
          .then(res => res.json())
          .then(otherEventsTimeline => {
            this.__otherEventsTimeline = otherEventsTimeline;
            resolve(otherEventsTimeline);
          })
      }
    });
  }

  /**************************************************
   * Confirmed/recovered/deaths stats
   **************************************************/

  getLoginEvents=()=>{
    return new Promise(resolve => {
      if (this.__loginEvents) {
        return this.__loginEvents;
      } else {
        dfd.read_json(process.env.REACT_APP_BACKEND_ADDRESS + `/login_events`)
          .then(loginEvents => {
            this.__loginEvents = loginEvents;
            resolve(loginEvents);
          })
      }
    });
  }
}

export default new AuthLogData();
