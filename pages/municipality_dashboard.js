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
import Link from "next/link";
import Loader from "../UI/Loader2.jsx";

function Municipality_dashboard() {
  const [completed, setCompleted] = useState([]);
  const [pending, setPending] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [birthcertificates, setBirthcertificates] = useState(true);
  const [callingurl, setCallingurl] = useState("/viewbirthapplication");

  useEffect(() => {
    const url = birthcertificates
      ? "/api/get_birth_certificate"
      : "/api/get_death_certificate";

    const curl = birthcertificates
      ? "/viewbirthapplication"
      : "/viewdeathapplication";
    setCallingurl(curl);

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        const data = response.data.allData;
        setCompleted(data.accepted);
        setPending(data.pending);
        setCancelled(data.rejected);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [birthcertificates]);

  const Applications = (
    <>
      <ViewMoreHeader
        title="Pending Applications:"
        type="Pending"
        certificate={birthcertificates ? "birth" : "death"}
      />
      <div className={styles.applications_container}>
        {pending.slice(0, 5).map((application) => {
          let fullName;
          if (birthcertificates) {
            fullName = `${application.childFirstName} ${application.childLastName}`;
          } else {
            fullName = `${application.firstName} ${application.lastName}`;
          }
          const id = application.applicant_id;
          const date = moment(application.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          const days = moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();

          return (
            <Link href={`/${callingurl}/${id}`} key={id}>
              <a>
                <ApplicationOuter
                  color="rgba(155, 197, 244, 0.849)"
                  name={fullName}
                  days={days}
                  id={id}
                  // onclick={"/${callingurl}"}
                />
              </a>
            </Link>
          );
        })}
      </div>
      <ViewMoreHeader
        title="Completed Applications:"
        type="Completed"
        certificate={birthcertificates ? "birth" : "death"}
      />
      <div className={styles.applications_container}>
        {completed.slice(0, 5).map((application) => {
          let fullName;
          if (birthcertificates) {
            fullName = `${application.childFirstName} ${application.childLastName}`;
          } else {
            fullName = `${application.firstName} ${application.lastName}`;
          }
          const id = application.applicant_id;
          const date = moment(application.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          const days = moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();


          return (
            <Link href={`/${callingurl}/${id}`} key={id}>
              <a>
                <ApplicationOuter
                  color="rgba(156, 244, 155, 0.849)"
                  name={fullName}
                  days={days}
                  key={id}
                  id={id}
                  data={application}
                />
              </a>
            </Link>
          );
        })}
      </div>
      <ViewMoreHeader
        title="Rejected Applications:"
        type="Rejected"
        certificate={birthcertificates ? "birth" : "death"}
      />
      <div className={styles.applications_container}>
        {cancelled.slice(0, 5).map((application) => {
          let fullName;
          if (birthcertificates) {
            fullName = `${application.childFirstName} ${application.childLastName}`;
          } else {
            fullName = `${application.firstName} ${application.lastName}`;
          }
          const id = application.applicant_id;
          const date = moment(application.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          );
          const days = moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();

          return (
            <Link href={`/${callingurl}/${id}`} key={id}>
              <a>
                <ApplicationOuter
                  color="rgba(244, 155, 155, 0.829)"
                  name={fullName}
                  days={days}
                  key={id}
                  id={id}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <div className={styles.municipality_dashboard_container}>
      <LeftPaneMunicipalityDashboard
        birthcertificates={birthcertificates}
        changecertificates={(value) => setBirthcertificates(value)}
      />
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

        {isLoading ? <Loader height="60vh" /> : Applications}
      </div>
    </div>
  );
}

export default Municipality_dashboard;
