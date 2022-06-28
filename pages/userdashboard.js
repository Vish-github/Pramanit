import {useRouter} from "next/router";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import birth from "../assets/PRAMANIT/birth.png";
import death from "../assets/PRAMANIT/death.png";

import Avatar from "@mui/material/Avatar";
import UserDashboardComponent from "../layout/UserDashboardComponent";

import Popper from "../UI/Popper";

import {connect} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {removeToken} from "../redux/actions/token.action";

function Userdashboard({accesstoken, removeUserDetails}) {
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
              {accesstoken?.username[0]}
            </Avatar>
            <h2 className={styles.user_name}>{accesstoken?.username}</h2>
          </div>
          <Popper logout={logout} />
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
  return {removeUserDetails: () => dispatch(removeToken())};
};

export default connect(mapStateToProps, mapDispatchToProps)(Userdashboard);
