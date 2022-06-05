import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";

// import { useSession } from "next-auth/react"

import {addToken} from "../redux/actions/token.action";

function Layout({children, accesstoken, addUserDetails}) {
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname == "/apply_certificate" ||
      router.pathname == "/userdashboard" ||
      router.pathname == "/user_certificate_view"
    )
      if (!accesstoken) {
        if (!localStorage.getItem("pramanit")) {
          // const { data } = useSession()
          // const { accessToken } = data
          // if(!accessToken)
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
