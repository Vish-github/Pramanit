import {Avatar} from "@mui/material";

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
  return (
    <div
      className={styles.application_outer_container}
      style={{backgroundColor: color}}
      onClick={onclick}
    >
      <Avatar
        style={{margin: "auto", width: 50, height: 50}}
        sx={{bgcolor: "#fff", color: "#930D0D", fontSize: 25}}
      >
        {name[0]}
      </Avatar>
      <p className={styles.application_outer_name}>{name}</p>
      {daysDisplay && (
        <p className={styles.application_outer_noOfDays}>{days}</p>
      )}
    </div>
  );
}

export default ApplicationOuter;
