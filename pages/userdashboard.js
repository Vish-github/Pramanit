import Image from "next/image";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import birth from "../assets/PRAMANIT/birth.png";
import death from "../assets/PRAMANIT/death.png";

import Avatar from "@mui/material/Avatar";
import UserDashboardComponent from "../layout/UserDashboardComponent";

import Popper from "../UI/Popper";

import {connect} from "react-redux";

function userdashboard({accesstoken}) {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{bgcolor: "#fff", color: "#930D0D"}}>
              {accesstoken?.username[0]}
            </Avatar>
            <h2 className={styles.user_name}>{accesstoken?.username}</h2>
          </div>
          <Popper />
        </div>
      </Header>
      <div className={styles.userdashboard_options}>
        <UserDashboardComponent
          image={birth}
          title="Birth Certificate"
          href="/user_certificate_view"
          active={true}
        />
        <UserDashboardComponent
          image={death}
          title="Death Certificate"
          href="/user_certificate_view"
          active={true}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  accesstoken: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(userdashboard);
