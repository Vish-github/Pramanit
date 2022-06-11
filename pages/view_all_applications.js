import Header from "../layout/Header";

import styles from "../styles/UserDashboard.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";
import { Box, CircularProgress, Grid } from "@mui/material";

function Userdashboard() {
  const router = useRouter();

  const [allApplications, setAllApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    const url = "/api/get_birth_certificate";

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url);
        const data = response.data.allData;

        if (router.query.type.toLowerCase() === "pending") {
          setAllApplications(data.pending);
          setColor("rgba(155, 197, 244, 0.849)");
        } else if (router.query.type.toLowerCase() === "completed") {
          setAllApplications(data.accepted);
          setColor("rgba(156, 244, 155, 0.849)");
        } else if (router.query.type.toLowerCase() === "rejected") {
          setAllApplications(data.rejected);
          setColor("rgba(155, 197, 244, 0.849)");
        } else {
          setAllApplications(null);
        }

        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router.isReady]);

  const Applications = (
    <Grid
      container
      className={styles.applications_container}
      style={{ padding: "1rem", margin: "1rem" }}
    >
      {allApplications.map((application) => {
        const fullName = `${application.childFirstName} ${application.childLastName}`;
        const id = application.applicant_id;
        const date = moment(application.createdAt).format(
          "MMMM Do YYYY, h:mm:ss a"
        );
        const days = moment(date, "MMMM Do YYYY, h:mm:ss a").fromNow();

        return (
          <Grid item key={id} xs={12} sm={6} md={4} lg={2}>
            <Link href={`/viewapplication/${id}`}>
              <a>
                <ApplicationOuter
                  color={color}
                  name={fullName}
                  days={days}
                  id={id}
                  // onclick={"/view_certificate"}
                />
              </a>
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );

  const Loader = (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <h2
              className={styles.user_name}
            >{`${router.query.type} Applications`}</h2>
          </div>
        </div>
      </Header>
      {!isLoading ? Applications : Loader}
    </div>
  );
}

export default Userdashboard;
