import {combineReducers} from "redux";
import tokenReducer from "./token.reducer";
import municipalityReducer from "./municipality.reducer";
import snackbarReducer from "./snackbar.reducer";

export default combineReducers({
  token: tokenReducer,
  municipality: municipalityReducer,
  snackbar: snackbarReducer,
});
