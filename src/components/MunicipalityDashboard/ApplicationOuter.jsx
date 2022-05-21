import {Avatar} from "@mui/material";
import {useRouter} from "next/router";

import styles from "../../../styles/ApplicationOuter.module.css";

function ApplicationOuter({
  name = "",
  days,
  color,
  data,
  id,
  daysDisplay = true,
  onclick = () => {},
}) {
  const router = useRouter();

  function truncateString(str, n) {
    if (str.length > n) {
      return str.substring(0, n) + "...";
    } else {
      return str;
    }
  }
  return (
    <div
      className={styles.application_outer_container}
      style={{backgroundColor: color}}
      onClick={() => router.push(`/viewapplication/${id}`)}
    >
      <Avatar
        style={{margin: "auto", width: 50, height: 50}}
        sx={{bgcolor: "#fff", color: "#930D0D", fontSize: 25}}
      >
        {name[0]}
      </Avatar>
      <p className={styles.application_outer_name}>
        {truncateString(name, 12)}
      </p>
      {daysDisplay && (
        <p className={styles.application_outer_noOfDays}>{days}</p>
      )}
    </div>
  );
}

export default ApplicationOuter;
