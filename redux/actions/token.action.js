import {TOKEN_EXPIRED, TOKEN_RECIEVED} from "../types";

export function addToken(payload) {
  return function (dispatch) {
    dispatch({type: TOKEN_RECIEVED, payload});
  };
}

export function removeToken() {
  return function (dispatch) {
    dispatch({type: TOKEN_EXPIRED});
  };
}
