import {
  MUNICIPALITY_TOKEN_EXPIRED,
  MUNICIPALITY_TOKEN_RECIEVED,
  TOKEN_EXPIRED,
  SUPERADMIN_TOKEN_EXPIRED,
  THIRDPARTYCOMPANY_TOKEN_EXPIRED,
} from "../types";

export function addMunicipalityToken(payload) {
  return function (dispatch) {
    localStorage.setItem("pramanit-municipality", JSON.stringify(payload));
    dispatch({type: MUNICIPALITY_TOKEN_RECIEVED, payload});
    dispatch({type: TOKEN_EXPIRED, payload});
    dispatch({type: SUPERADMIN_TOKEN_EXPIRED, payload});
    dispatch({type: THIRDPARTYCOMPANY_TOKEN_EXPIRED, payload});
  };
}

export function removeMunicipalityToken() {
  return function (dispatch) {
    dispatch({type: MUNICIPALITY_TOKEN_EXPIRED});
    localStorage.removeItem("pramanit-municipality");
  };
}
