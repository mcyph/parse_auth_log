import * as dfd from "danfojs/src/index";
import dfPopulationData from "./populationData";

class CovidData {
  constructor() {
    this.__cache = {};
  }

  __fromURL=async(URL)=>{
    if (!this.__cache[URL]) {
      this.__cache[URL] = (await dfd.read_json(URL))
        .astype({column: "confirmed", dtype: "int32"})
        .astype({column: "deaths", dtype: "int32"})
        .astype({column: "recovered", dtype: "int32"})
        .set_index({ key: "iso3", drop: false });
    }
    return this.__cache[URL];
  }

  /**************************************************
   * World-wide stats
   **************************************************/

  getBasicStats=async()=>{
    const URL = "https://covid19.mathdro.id/api";
    let df = await this.__fromURL(URL);
    dfd.merge({
      "left": df,
      "right": dfPopulationData,
      "on": ["iso3"]
    });
  }

  /**************************************************
   * Confirmed/recovered/deaths stats
   **************************************************/

  getDetailedStats=async(key)=>{
    if (["confirmed", "deaths", "recovered"].indexOf(key) === -1) {
      throw new Error("Invalid stats key: "+key);
    } else if (this.__cache[key]) {
      // Use the cached version if possible
      // as join operations are quite expensive
      return this.__cache[key];
    }

    let URL = `https://covid19.mathdro.id/api/${key}`;
    let df = await this.__fromURL(URL);
    let r = dfd.merge({
      "left": df,
      "right": dfPopulationData,
      "on": ["iso3"]
    })

    this.__cache[key] = r;
    return r;
  }

  /**************************************************
   * Daily time-series stats
   **************************************************/

  getDaily=async()=>{
    const URL = "https://covid19.mathdro.id/api/daily";
    let df = await this.__fromURL(URL);
    return df;
  }
}

export default new CovidData();
