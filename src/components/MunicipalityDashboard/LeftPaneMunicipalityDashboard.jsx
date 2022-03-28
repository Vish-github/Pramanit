import Image from "next/image";

import {Avatar} from "@mui/material";

import styles from "../../../styles/LeftPaneMunicipalityDashboard.module.css";
import logout from "../../../assets/svgs/logout.svg";

import MunicipalityDetails from "./MunicipalityDetails";
import TypeOfCertificate from "./TypeOfCertificate";

function LeftPaneMunicipalityDashboard() {
  return (
    <div className={styles.LeftPaneMunicipalityDashboard_container}>
      <Avatar style={{width: 50, height: 50, margin: "auto"}} />
      <h2 className={styles.municipality_name}>MUNCIPALITY NAME</h2>
      <TypeOfCertificate active={false} title="Birth Certificates" />
      <TypeOfCertificate active={true} title="Death Certificates" />
      <MunicipalityDetails />
      <div className={styles.municipality_logout}>
        <Image src={logout} alt="Logout" />
        <p>Log out</p>
      </div>
    </div>
  );
}

export default LeftPaneMunicipalityDashboard;
