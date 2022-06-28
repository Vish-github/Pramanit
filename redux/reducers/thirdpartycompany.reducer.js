import {
  THIRDPARTYCOMPANY_TOKEN_EXPIRED,
  THIRDPARTYCOMPANY_TOKEN_RECIEVED,
} from "../types.js";

const initialState = {thirdparty: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case THIRDPARTYCOMPANY_TOKEN_RECIEVED:
      return {thirdparty: action.payload};
    case THIRDPARTYCOMPANY_TOKEN_EXPIRED:
      return {thirdparty: null};
    default:
      return state;
  }
}
