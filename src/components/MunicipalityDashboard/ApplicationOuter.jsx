import {Avatar} from "@mui/material";
import styles from "../../../styles/ApplicationOuter.module.css";

function ApplicationOuter({name = "", days, color}) {
  return (
    <div
      className={styles.application_outer_container}
      style={{backgroundColor: color}}
    >
      <Avatar
        style={{margin: "auto", width: 100, height: 100}}
        sx={{bgcolor: "#fff", color: "#930D0D", fontSize: 40}}
      >
        {name[0]}
      </Avatar>
      <p className={styles.application_outer_name}>{name}</p>
      <p className={styles.application_outer_noOfDays}>{days} days ago</p>
    </div>
  );
}

export default ApplicationOuter;
