
import {legacy_createStore}  from "redux";

import productReducer from "./Reducer";

export  const store = legacy_createStore(productReducer);

