import * as dfd from "danfojs/src/index";
import dfPopulationData from "./populationData";

class AuthLogData {
  constructor() {
    this.__cache = {};
  }

  __fromURL=async(URL)=>{
    if (!this.__cache[URL]) {
      this.__cache[URL] = (await dfd.read_json(`localhost:9779/${URL}`))
    }
    return this.__cache[URL];
  }

  /**************************************************
   * Other Events Timeline
   **************************************************/

  getOtherEventsTimeline=async()=>{
    let df = await this.__fromURL("other_events_timeline")
        .astype({column: "id", dtype: "int32"})
        //.astype({column: "eventdatetime", dtype: "int32"})
        //.astype({column: "type", dtype: "int32"})
        //.astype({ column: "message", dtype: false });
    return df;
  }

  /**************************************************
   * Confirmed/recovered/deaths stats
   **************************************************/

  getLoginEvents=async(key)=>{
    let df = await this.__fromURL("login_events");
        .astype({column: "id", dtype: "int32"})
        //.astype({column: "eventdatetime", dtype: "int32"})
        //.astype({column: "type", dtype: "int32"})
        //.astype({column: "ip", dtype: "int32"})
        //.astype({column: "country_code", dtype: "int32"})
        //.astype({column: "username", dtype: "int32"})
    return df;
  }
}

export default new AuthLogData();
