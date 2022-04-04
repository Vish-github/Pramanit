import { Grid, Typography } from "@mui/material";

import DateTimePicker from "../src/components/Forms/FormUI/DateTimePicker";

import styles from "../styles/FormUI.module.css";

function DateTime({ title = "", name = "", ...otherProps }) {
  return (
    <Grid item sm={10} marginBottom={1} xs={12}>
      <Typography className={styles.label}>{title}</Typography>
      <DateTimePicker name={name} {...otherProps} />
    </Grid>
  );
}

export default DateTime;
