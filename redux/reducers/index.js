import {combineReducers} from "redux";
import tokenReducer from "./token.reducer";
import municipalityReducer from "./municipality.reducer";

export default combineReducers({
  token: tokenReducer,
  municipality: municipalityReducer,
});
