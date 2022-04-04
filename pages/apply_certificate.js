import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";
import FormClasses from "../styles/FormUI.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ApplyCertificateForm from "../src/components/Forms/ApplyCertificateForm";

function ApplyCertificate() {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <ArrowBackIcon />
            <h2 className={styles.user_name}>
              Apply for your birth certificate
            </h2>
          </div>
        </div>
      </Header>

      <ApplyCertificateForm />
    </div>
  );
}

export default ApplyCertificate;
