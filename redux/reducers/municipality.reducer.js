import {
  MUNICIPALITY_TOKEN_EXPIRED,
  MUNICIPALITY_TOKEN_RECIEVED,
} from "../types.js";

const initialState = {municipality: null};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MUNICIPALITY_TOKEN_RECIEVED:
      return {municipality: action.payload};
    case MUNICIPALITY_TOKEN_EXPIRED:
      return {municipality: null};
    default:
      return state;
  }
}
