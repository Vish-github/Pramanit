import {useRouter} from "next/router";

import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MunicipalityDetailsForm from "../src/components/Forms/MunicipalityDetailsForm";

function MunicipalityDetails() {
  const router = useRouter();

  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <ArrowBackIcon
              onClick={() => router.back()}
              style={{cursor: "pointer"}}
            />
            <h2 className={styles.user_name}>Municipality Details</h2>
          </div>
        </div>
      </Header>

      <MunicipalityDetailsForm />
    </div>
  );
}

export default MunicipalityDetails;
