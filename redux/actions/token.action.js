import {TOKEN_EXPIRED, TOKEN_RECIEVED} from "../types";

export function addToken(payload) {
  return function (dispatch) {
    localStorage.setItem("pramanit-user", JSON.stringify(payload));
    dispatch({type: TOKEN_RECIEVED, payload});
  };
}

export function removeToken() {
  return function (dispatch) {
    dispatch({type: TOKEN_EXPIRED});
    localStorage.removeItem("pramanit-user");
  };
}
