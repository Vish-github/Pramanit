import React from "react";
import {withRedux} from "../middleware/with-redux-store";

function Layout({children}) {
  return <div>{children}</div>;
}

export default withRedux(Layout);
