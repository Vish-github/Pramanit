import {
  SUPERADMIN_TOKEN_RECIEVED,
  SUPERADMIN_TOKEN_EXPIRED,
  THIRDPARTYCOMPANY_TOKEN_EXPIRED,
  MUNICIPALITY_TOKEN_EXPIRED,
  TOKEN_EXPIRED,
} from "../types";

export function addSuperadminToken(payload) {
  return function (dispatch) {
    localStorage.setItem("pramanit-superadmin", JSON.stringify(payload));
    dispatch({type: SUPERADMIN_TOKEN_RECIEVED, payload});
    dispatch({type: TOKEN_EXPIRED});
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED});
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_EXPIRED});
  };
}

export function removeSuperadminToken() {
  return function (dispatch) {
    dispatch({type: SUPERADMIN_TOKEN_EXPIRED});
    localStorage.removeItem("pramanit-superadmin");
  };
}
