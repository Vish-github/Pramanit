import React from "react";
import {connect} from "react-redux";
import {addToken, removeToken} from "../redux/actions/token.action";

function Counter({counter, increment, decrement, reset}) {
  return (
    <div>
      <p>{counter}</p>
      <button onClick={() => increment("called")}>INCREMENT</button>
      <button onClick={decrement}>DECREMENT</button>
      <button onClick={reset}>RESET</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counterReducer?.counter,
});

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (param) => dispatch(addToken(param)),
    decrement: () => dispatch(removeToken()),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
