import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";

import {addToken} from "../redux/actions/token.action";

function Layout({children, accesstoken, addUserDetails}) {
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname != "/" ||
      router.pathname != "/login" ||
      router.pathname != "register"
    )
      if (!accesstoken) {
        if (!localStorage.getItem("pramanit")) {
          router.push("/login");
        } else {
          addUserDetails(JSON.parse(localStorage.getItem("pramanit")));
        }
      }
  }, [router.pathname]);
  return <div>{children}</div>;
}

const mapStateToProps = (state) => ({
  accesstoken: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserDetails: (param) => dispatch(addToken(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
