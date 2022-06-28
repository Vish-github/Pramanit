import {useRouter} from "next/router";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import Avatar from "@mui/material/Avatar";

import Popper from "../UI/Popper";

import {connect} from "react-redux";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";

import axios from "axios";
import {removeThirdpartyToken} from "../redux/actions/thirdpartyCompany.action";

function ThirdPartyDashboard({accesstoken, removeThirdPartyDetails}) {
  const router = useRouter();

  const openpdf = (value) => {
    axios(`/api/pdf_getter/${value}`, {
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const file = new Blob([response.data], {
        type: "application/pdf",
      });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  };

  const logout = () => {
    removeThirdPartyDetails();
    router.push("/thirdpartylogin");
  };

  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{bgcolor: "#fff", color: "#930D0D"}}>
              {accesstoken?.name[0]}
            </Avatar>
            <h2 className={styles.user_name}>{accesstoken?.name}</h2>
          </div>
          <Popper logout={logout} />
        </div>
      </Header>
      <div className={styles.userdashboard_options}>
        {accesstoken?.birthcertificates?.map((birthcertificate, i) => (
          <div key={i} onClick={() => openpdf(birthcertificate?.ipfshash)}>
            <a>
              <ApplicationOuter
                color="rgba(155, 197, 244, 0.849)"
                name={birthcertificate.username}
                id={i}
                daysDisplay={false}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  accesstoken: state.thirdparty?.thirdparty,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeThirdPartyDetails: () => dispatch(removeThirdpartyToken()),
    reset: () => dispatch(reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThirdPartyDashboard);
