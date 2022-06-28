import {
  THIRDPARTYCOMPANY_TOKEN_EXPIRED,
  THIRDPARTYCOMPANY_TOKEN_RECIEVED,
  MUNICIPALITY_TOKEN_EXPIRED,
  TOKEN_EXPIRED,
  SUPERADMIN_TOKEN_EXPIRED,
} from "../types";

export function addThirdpartyToken(payload) {
  return function (dispatch) {
    localStorage.setItem("pramanit-thirdparty", JSON.stringify(payload));
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_RECIEVED, payload});
    dispatch({type: TOKEN_EXPIRED, payload});
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED, payload});
    dispatch({type: SUPERADMIN_TOKEN_EXPIRED, payload});
  };
}

export function removeThirdpartyToken() {
  return function (dispatch) {
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_EXPIRED});
    localStorage.removeItem("pramanit-thirdparty");
  };
}
