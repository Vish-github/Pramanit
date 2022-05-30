import {
  MUNICIPALITY_TOKEN_EXPIRED,
  MUNICIPALITY_TOKEN_RECIEVED,
  TOKEN_EXPIRED,
} from "../types";

export function addMunicipalityToken(payload) {
  return function (dispatch) {
    dispatch({type: MUNICIPALITY_TOKEN_RECIEVED, payload});
    dispatch({type: TOKEN_EXPIRED, payload});
  };
}

export function removeMunicipalityToken() {
  return function (dispatch) {
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED});
  };
}
