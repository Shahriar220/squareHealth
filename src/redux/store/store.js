import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getDoctorReducer,
  singleDoctorReducer,
} from "../reducers/doctorsReducer";

const finalReducer = combineReducers({
  getDoctorReducer: getDoctorReducer,
  singleDoctorReducer: singleDoctorReducer,
});
const initialState = {};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
