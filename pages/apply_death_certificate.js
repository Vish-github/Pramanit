import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ApplyDeathCertificateForm from "../src/components/Forms/ApplyDeathCertificateForm";

function ApplyDeathCertificate() {
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <ArrowBackIcon />
            <h2 className={styles.user_name}>
              Apply for your death certificate
            </h2>
          </div>
        </div>
      </Header>

      <ApplyDeathCertificateForm />
    </div>
  );
}

export default ApplyDeathCertificate;
