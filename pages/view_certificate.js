import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import ViewCertificateForm from "../src/components/Forms/ViewCertificateForm";
import { Avatar } from "@mui/material";

function ViewCertificate() {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{ bgcolor: "#fff", color: "#930D0D" }}>H</Avatar>
            <h2 className={styles.user_name}>Hello World</h2>
          </div>
        </div>
      </Header>

      <ViewCertificateForm />
    </div>
  );
}

export default ViewCertificate;
