import {
  MUNICIPALITY_TOKEN_EXPIRED,
  MUNICIPALITY_TOKEN_RECIEVED,
} from "../types";

export function addMunicipalityToken(payload) {
  return function (dispatch) {
    dispatch({type: MUNICIPALITY_TOKEN_RECIEVED, payload});
  };
}

export function removeMunicipalityToken() {
  return function (dispatch) {
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED});
  };
}
