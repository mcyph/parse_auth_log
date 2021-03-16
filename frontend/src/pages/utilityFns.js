import * as dfd from "danfojs/src/index";

let fns = {
  reduceToOnlyCols:(df, cols)=>{
    // We're only interested in these properties,
    // so reduce to only them to increase performance
    let spread = {};
    for (let col of cols) {
      spread[col] = df[col].values;
    }
    return new dfd.DataFrame(spread);
  },
  getTwoTuples:(df, col1, col2)=>{
    // Convert to arrays of [[column, value], ...]
    let values = [df[col1].values, df[col2].values];
    let valuesOut = [];
    for (let i=0; i<values[0].length; i++) {
      valuesOut.push([values[0][i], values[1][i]])
    }
    return valuesOut;
  },
  isMobile:()=>{
    let width = (
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
    );
    return width < 800;
  }
};

export default fns;
