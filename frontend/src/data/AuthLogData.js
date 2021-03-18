import * as dfd from "danfojs/src/index";

class AuthLogData {
  /**************************************************
   * Confirmed/recovered/deaths stats
   **************************************************/

  getLoginEvents=(key)=>{
    return dfd.read_json(process.env.BACKEND_ADDRESS + `/login_events`);
  }
}

export default new AuthLogData();
