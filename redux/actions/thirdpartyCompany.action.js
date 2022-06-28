import {
  THIRDPARTYCOMPANY_TOKEN_EXPIRED,
  THIRDPARTYCOMPANY_TOKEN_RECIEVED,
  MUNICIPALITY_TOKEN_EXPIRED,
  TOKEN_EXPIRED,
} from "../types";

export function addThirdpartyToken(payload) {
  return function (dispatch) {
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_RECIEVED, payload});
    dispatch({type: TOKEN_EXPIRED, payload});
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED, payload});
  };
}

export function removeThirdpartyToken() {
  return function (dispatch) {
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_EXPIRED});
  };
}
