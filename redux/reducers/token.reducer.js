import {TOKEN_EXPIRED, TOKEN_RECIEVED} from "../types.js";

const initialState = {token: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_RECIEVED:
      return {token: action.payload};
    case TOKEN_EXPIRED:
      return {token: null};
    default:
      return state;
  }
}
