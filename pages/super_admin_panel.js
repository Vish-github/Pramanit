import {useState} from "react";

import Image from "next/image";

import Header from "../layout/Header";

import styles from "../styles/SuperAdminPanel.module.css";
import styles1 from "../styles/Modal.module.css";
import addnewmunicipality from "../assets/PRAMANIT/Addnewmunicipality.png";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";
import Modal from "../layout/Modal";
import AddMunicipalityForm from "../src/components/Forms/AddMunicipalityForm";
import ViewMunicipalityCredentials from "../src/components/Forms/ViewMunicipalityCredentials";

function SuperAdminPanel() {
  const [open, setOpen] = useState(false);

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
        <AddMunicipalityForm />
      </div>
      <h6 className={styles.page_title} style={{paddingLeft: "50px"}}>
        Municipality Credentials:
      </h6>

      <div className={styles.municipality_container}>
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h6 className={styles1.modalHeading}>Ponda Municipality Credentials</h6>
        <ViewMunicipalityCredentials />
      </Modal>
    </div>
  );
}

export default SuperAdminPanel;
