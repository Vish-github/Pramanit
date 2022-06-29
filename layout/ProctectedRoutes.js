import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {connect} from "react-redux";

import {addToken} from "../redux/actions/token.action";
import {addMunicipalityToken} from "../redux/actions/municipality.action";
import {addSuperadminToken} from "../redux/actions/superadmin.action";
import {addThirdpartyToken} from "../redux/actions/thirdpartyCompany.action";

function Layout({
  children,
  accesstoken,
  municipalitytoken,
  superadmintoken,
  thirdpartytoken,
  addUserDetails,
  addMunicipalityDetails,
  addSuperadminDetails,
  addThirdpartyDetails,
}) {
  const router = useRouter();
  useEffect(() => {
    if (
      router.pathname == "/apply_birth_certificate" ||
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
          addUserDetails(JSON.parse(localStorage.getItem("pramanit-user")));
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
    } else if (router.pathname == "/thirdpartydashboard") {
      if (!thirdpartytoken) {
        if (!localStorage.getItem("pramanit-thirdparty")) {
          router.push("/thirdpartylogin");
        } else {
          addThirdpartyDetails(
            JSON.parse(localStorage.getItem("pramanit-thirdparty"))
          );
        }
      }
    } else if (router.pathname == "/super_admin_panel") {
      if (!superadmintoken) {
        if (!localStorage.getItem("pramanit-superadmin")) {
          router.push("/superadminlogin");
        } else {
          addSuperadminDetails(
            JSON.parse(localStorage.getItem("pramanit-superadmin"))
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
  superadmintoken: state.superadmin?.superadmin,
  thirdpartytoken: state.thirdparty?.thirdparty,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserDetails: (param) => dispatch(addToken(param)),
    addMunicipalityDetails: (param) => dispatch(addMunicipalityToken(param)),
    addSuperadminDetails: (param) => dispatch(addSuperadminToken(param)),
    addThirdpartyDetails: (param) => dispatch(addThirdpartyToken(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
