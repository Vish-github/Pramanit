import { useState } from "react";

import Image from "next/image";

import Header from "../layout/Header";

import styles from "../styles/SuperAdminPanel.module.css";
import addnewmunicipality from "../assets/PRAMANIT/Addnewmunicipality.png";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";
import Modal from "../layout/Modal";
import AddMunicipalityForm from "../src/components/Forms/AddMunicipalityForm";

function SuperAdminPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header>
        <p className={styles.page_title}>Super Admin</p>
      </Header>
      <h6 className={styles.page_title} style={{ paddingLeft: "50px" }}>
        Add new municipality
      </h6>
      <div className={styles.add_municipality_container}>
        <Image
          src={addnewmunicipality}
          width={300}
          height={300}
          alt="Add new municipality"
        />
        <div>
          <AddMunicipalityForm />
        </div>
      </div>
      <h6 className={styles.page_title} style={{ paddingLeft: "50px" }}>
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
      <Modal open={open} setOpen={setOpen} municipality_name="Ponda">
        Display modal
      </Modal>
    </div>
  );
}

export default SuperAdminPanel;
