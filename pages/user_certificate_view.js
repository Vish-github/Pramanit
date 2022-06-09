import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import applycertificate from "../assets/PRAMANIT/applycertificate.png";
import viewcertificate from "../assets/PRAMANIT/viewcertificate.png";

import Avatar from "@mui/material/Avatar";
import UserDashboardComponent from "../layout/UserDashboardComponent";

import Popper from "../UI/Popper";

import {connect} from "react-redux";

function User_certificate_view({token}) {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{bgcolor: "#fff", color: "#930D0D"}}>
              {token?.username ? token.username[0] : "u"}
            </Avatar>
            <h2 className={styles.user_name}>
              {token?.username ? token.username : "User"}
            </h2>
          </div>
          <Popper />
        </div>
      </Header>
      {token?.birthCertificateStatus == 1 && (
        <p className={styles.certificateAppliedText}>
          Birth Certificate is applied! Please wait for the response from
          municipality
        </p>
      )}
      <div className={styles.userdashboard_options}>
        <UserDashboardComponent
          image={applycertificate}
          title="Apply for certificate"
          href="/apply_certificate"
          active={token?.birthCertificateStatus == 0}
        />
        <UserDashboardComponent
          image={viewcertificate}
          title="View Certificate"
          href="/user_birth_certificate"
          active={token?.birthCertificateStatus == 2}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User_certificate_view);
