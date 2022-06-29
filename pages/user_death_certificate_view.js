import {useRouter} from "next/router";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import applydeathcertifcate from "../assets/PRAMANIT/applydeathcertifcate.png";
import viewdeathcertificate from "../assets/PRAMANIT/viewdeathcertificate.png";

import Avatar from "@mui/material/Avatar";
import UserDashboardComponent from "../layout/UserDashboardComponent";

import Popper from "../UI/Popper";

import {connect} from "react-redux";
import {removeToken} from "../redux/actions/token.action";

import {signOut, useSession} from "next-auth/react";

function User_death_certificate_view({token, removeUserDetails}) {
  const router = useRouter();
  const {data: session} = useSession();

  const logout = () => {
    if (session) {
      signOut("google");
    }
    removeUserDetails();
    if (!session) router.push("/login");
  };

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
          <Popper logout={logout} />
        </div>
      </Header>
      {token?.deathCertificateStatus == 1 && (
        <p className={styles.certificateAppliedText}>
          Death Certificate is applied! Please wait for the response from
          municipality
        </p>
      )}
      <div className={styles.userdashboard_options}>
        <UserDashboardComponent
          image={applydeathcertifcate}
          title="Apply for certificate"
          href="/apply_death_certificate"
          active={token?.deathCertificateStatus == 0}
        />
        <UserDashboardComponent
          image={viewdeathcertificate}
          title="View Certificate"
          href="/user_birth_certificate"
          active={token?.deathCertificateStatus == 2}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {removeUserDetails: () => dispatch(removeToken())};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User_death_certificate_view);
