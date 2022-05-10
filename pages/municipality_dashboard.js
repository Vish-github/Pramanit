import Image from "next/image";

import LeftPaneMunicipalityDashboard from "../src/components/MunicipalityDashboard/LeftPaneMunicipalityDashboard.jsx";

import styles from "../styles/MunicipalityDashboard.module.css";
import search from "../assets/svgs/search.svg";
import MunicipalityStat from "../src/components/MunicipalityDashboard/MunicipalityStat.jsx";
import ViewMoreHeader from "../layout/ViewMoreHeader.jsx";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter.jsx";

function municipality_dashboard() {
  // const router = useRouter();

  // const callRoute = (name) => router.push(name);

  return (
    <div className={styles.municipality_dashboard_container}>
      <LeftPaneMunicipalityDashboard />
      <div className={styles.municipality_display}>
        <div className={styles.municipality_search}>
          <Image src={search} alt="Search" width={20} height={20} />
          <input
            type="text"
            placeholder="Type here to search"
            className={styles.searchinput}
          />
        </div>
        <div className={styles.municipality_stats}>
          <MunicipalityStat color="#265005" value={12} title="Completed" />
          <MunicipalityStat color="#DCCB36" value={12} title="Pending" />
          <MunicipalityStat color="#930D0D" value={12} title="Cancelled" />
        </div>
        <ViewMoreHeader title="Pending Applications:" />
        <div className={styles.applications_container}>
          <ApplicationOuter
            color="rgba(155, 197, 244, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />

          <ApplicationOuter
            color="rgba(155, 197, 244, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
          <ApplicationOuter
            color="rgba(155, 197, 244, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
        </div>
        <ViewMoreHeader title="Completed Applications:" />
        <div className={styles.applications_container}>
          <ApplicationOuter
            color="rgba(156, 244, 155, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />

          <ApplicationOuter
            color="rgba(156, 244, 155, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
          <ApplicationOuter
            color="rgba(156, 244, 155, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
        </div>
        <ViewMoreHeader title="Rejected Applications:" />
        <div className={styles.applications_container}>
          <ApplicationOuter
            color="rgba(244, 155, 155, 0.829)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
          <ApplicationOuter
            color="rgba(244, 155, 155, 0.829)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
          <ApplicationOuter
            color="rgba(244, 155, 155, 0.829)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
        </div>
      </div>
    </div>
  );
}

export default municipality_dashboard;
