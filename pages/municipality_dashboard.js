import Image from "next/image";

import LeftPaneMunicipalityDashboard from "../src/components/MunicipalityDashboard/LeftPaneMunicipalityDashboard.jsx";
import axios from "axios";
import styles from "../styles/MunicipalityDashboard.module.css";
import search from "../assets/svgs/search.svg";
import MunicipalityStat from "../src/components/MunicipalityDashboard/MunicipalityStat.jsx";
import ViewMoreHeader from "../layout/ViewMoreHeader.jsx";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter.jsx";
import { useEffect, useState } from "react";

import moment from "moment";

function municipality_dashboard() {
  // const router = useRouter();

  // const callRoute = (name) => router.push(name);

  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  useEffect(() => {
    const url = "/api/get_birth_certificate";

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data.allData;
        console.log(data);

        setCompleted(data.accepted);
        setPending(data.pending);
        setCancelled(data.rejected);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

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
          <MunicipalityStat
            color="#265005"
            value={completed.length}
            title="Completed"
          />
          <MunicipalityStat
            color="#DCCB36"
            value={pending.length}
            title="Pending"
          />
          <MunicipalityStat
            color="#930D0D"
            value={cancelled.length}
            title="Cancelled"
          />
        </div>
        <ViewMoreHeader title="Pending Applications:" />
        <div className={styles.applications_container}>
          {/* 
          <ApplicationOuter
            color="rgba(155, 197, 244, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          /> */}
          {pending.map((application) => {
            const fullName = `${application.childFirstName} ${application.childLastName}`;
            const id = application.applicant_id;
            const date = moment(application.createdAt).format("YYYY-MM-DD");
            const days = moment(date, "YYYY-MM-DD").fromNow();

            return (
              <ApplicationOuter
                color="rgba(155, 197, 244, 0.849)"
                name={fullName}
                days={days}
                key={id}
                id={id}
                // onclick={"/view_certificate"}
              />
            );
          })}
        </div>
        <ViewMoreHeader title="Completed Applications:" />
        <div className={styles.applications_container}>
          {/* <ApplicationOuter
            color="rgba(156, 244, 155, 0.849)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />

          */}
          {completed.map((application) => {
            const fullName = `${application.childFirstName} ${application.childLastName}`;
            const id = application.applicant_id;
            const date = moment(application.createdAt).format("YYYY-MM-DD");
            const days = moment(date, "YYYY-MM-DD").fromNow();

            console.log(days);

            return (
              <ApplicationOuter
                color="rgba(156, 244, 155, 0.849)"
                name={fullName}
                days={days}
                key={id}
                id={id}
                data={application}
                // onclick={"/view_certificate"}
              />
            );
          })}
        </div>
        <ViewMoreHeader title="Rejected Applications:" />
        <div className={styles.applications_container}>
          {/* <ApplicationOuter
            color="rgba(244, 155, 155, 0.829)"
            name="Hello World"
            days={5}
            // onclick={"/view_certificate"}
          />
           */}
          {cancelled.map((application) => {
            const fullName = `${application.childFirstName} ${application.childLastName}`;
            const id = application.applicant_id;
            const date = moment(application.createdAt).format("YYYY-MM-DD");
            const days = moment(date, "YYYY-MM-DD").fromNow();

            console.log(days);

            return (
              <ApplicationOuter
                color="rgba(244, 155, 155, 0.829)"
                name={fullName}
                days={days}
                key={id}
                id={id}
                // onclick={"/view_certificate"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default municipality_dashboard;
