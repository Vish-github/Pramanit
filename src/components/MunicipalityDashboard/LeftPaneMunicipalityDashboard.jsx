import Image from "next/image";

import {Avatar} from "@mui/material";
import {connect} from "react-redux";
import {useRouter} from "next/router";

import styles from "../../../styles/LeftPaneMunicipalityDashboard.module.css";
import logout from "../../../assets/svgs/logout.svg";

import MunicipalityDetails from "./MunicipalityDetails";
import TypeOfCertificate from "./TypeOfCertificate";
import {removeMunicipalityToken} from "../../../redux/actions/municipality.action";

function LeftPaneMunicipalityDashboard({
  removeMunicipalityDetails,
  municipalitytoken,
}) {
  const router = useRouter();
  return (
    <div className={styles.LeftPaneMunicipalityDashboard_container}>
      <Avatar style={{width: 50, height: 50, margin: "auto"}} />
      <h2 className={styles.municipality_name}>
        {" "}
        {municipalitytoken?.municipality.name} MUNCIPALITY
      </h2>

      <TypeOfCertificate active={false} title="Birth Certificates" />
      <TypeOfCertificate active={true} title="Death Certificates" />
      <MunicipalityDetails details={municipalitytoken?.municipality} />
      <div
        className={styles.municipality_logout}
        onClick={() => {
          removeMunicipalityDetails();
          router.push("/municipality_login");
        }}
      >
        <Image src={logout} alt="Logout" />
        <p>Log out</p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  municipalitytoken: state.municipality?.municipality,
});

const mapDispatchToProps = (dispatch) => {
  return {
    removeMunicipalityDetails: () => dispatch(removeMunicipalityToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPaneMunicipalityDashboard);
