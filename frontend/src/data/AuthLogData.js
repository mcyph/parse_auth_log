import * as dfd from "danfojs/src/index";

class AuthLogData {
  /**************************************************
   * Other Events Timeline
   **************************************************/

  getOtherEventsTimeline=()=>{
    return dfd.read_json(`http://127.0.0.1:9779/other_events_timeline`);
  }

  /**************************************************
   * Confirmed/recovered/deaths stats
   **************************************************/

  getLoginEvents=(key)=>{
    return dfd.read_json(`http://127.0.0.1:9779/login_events`);
  }
}

export default new AuthLogData();
