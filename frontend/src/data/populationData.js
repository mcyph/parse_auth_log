import * as dfd from "danfojs/src/index";

import dfWorldBankPop from "./populationData/worldbank_pop.csv";
import dfWorldBankPopMetadata from "./populationData/worldbank_pop_metadata.csv";

let __joined = dfd.merge({
  "left": dfWorldBankPop,
  "right": dfWorldBankPopMetadata,
  "on": ["iso3"]
}).astype({column: "Population", dtype: "int32"});

export default __joined;
