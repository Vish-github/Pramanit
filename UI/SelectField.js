import { Grid, Typography } from "@mui/material";

import SelectField from "../src/components/Forms/FormUI/SelectWrapper";

import styles from "../styles/FormUI.module.css";

function InputField({
  title = "",
  name = "",
  type = "",
  smwidth = 10,
  ...otherProps
}) {
  return (
    <Grid item sm={smwidth} marginBottom={1} xs={12}>
      <Typography className={styles.label}>{title}</Typography>
      <SelectField
        name={name}
        InputProps={{ className: styles.input }}
        type={type}
        {...otherProps}
      />
    </Grid>
  );
}

export default InputField;
