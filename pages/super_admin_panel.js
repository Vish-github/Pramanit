import Image from "next/image";

import Header from "../layout/Header";

import styles from "../styles/SuperAdminPanel.module.css";
import addnewmunicipality from "../assets/PRAMANIT/Addnewmunicipality.png";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";

function SuperAdminPanel() {
  return (
    <div>
      <Header>
        <p className={styles.page_title}>Super Admin</p>
      </Header>
      <h6 className={styles.page_title} style={{paddingLeft: "50px"}}>
        Add new municipality
      </h6>
      <div className={styles.add_municipality_container}>
        <Image
          src={addnewmunicipality}
          width={300}
          height={300}
          alt="Add new municipality"
        />
        <div>{/* form here */}</div>
      </div>
      <h6 className={styles.page_title} style={{paddingLeft: "50px"}}>
        Municipality Credentials:
      </h6>

      <div className={styles.municipality_container}>
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
        />
      </div>
    </div>
  );
}

export default SuperAdminPanel;
