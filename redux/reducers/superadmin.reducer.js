import {SUPERADMIN_TOKEN_EXPIRED, SUPERADMIN_TOKEN_RECIEVED} from "../types.js";

const initialState = {superadmin: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SUPERADMIN_TOKEN_RECIEVED:
      return {superadmin: action.payload};
    case SUPERADMIN_TOKEN_EXPIRED:
      return {superadmin: null};
    default:
      return state;
  }
}
