import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";

import {addToken} from "../redux/actions/token.action";
import {addMunicipalityToken} from "../redux/actions/municipality.action";

function Layout({
  children,
  accesstoken,
  municipalitytoken,
  addUserDetails,
  addMunicipalityDetails,
}) {
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname == "/apply_certificate" ||
      router.pathname == "/userdashboard" ||
      router.pathname == "/user_certificate_view" ||
      router.pathname == "/user_birth_certificate"
    ) {
      if (!accesstoken) {
        if (!localStorage.getItem("pramanit-user")) {
          // const { data } = useSession()
          // const { accessToken } = data
          // if(!accessToken)
          router.push("/login");
        } else {
          addUserDetails(JSON.parse(localStorage.getItem("pramanit")));
        }
      }
    } else if (
      router.pathname == "/municipality_dashboard" ||
      router.pathname == "/municipality_details" ||
      router.pathname == "/view_all_applications"
    ) {
      if (!municipalitytoken) {
        console.log("Token not found");
        if (!localStorage.getItem("pramanit-municipality")) {
          router.push("/municipality_login");
        } else {
          addMunicipalityDetails(
            JSON.parse(localStorage.getItem("pramanit-municipality"))
          );
        }
      }
    }
  }, [router.pathname]);
  return <div>{children}</div>;
}

const mapStateToProps = (state) => ({
  accesstoken: state.token?.token,
  municipalitytoken: state.municipality?.municipality,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserDetails: (param) => dispatch(addToken(param)),
    addMunicipalityDetails: (param) => dispatch(addMunicipalityToken(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
