import {Grid, Typography} from "@mui/material";

import TextField from "../src/components/Forms/FormUI/TextFieldWrapper";

import styles from "../styles/FormUI.module.css";

function InputField({
  title = "",
  name = "",
  type = "",
  smwidth = 10,
  disabled = false,
  ...otherProps
}) {
  return (
    <Grid item sm={smwidth} marginBottom={1} xs={12}>
      <Typography className={styles.label}>{title}</Typography>
      <TextField
        name={name}
        InputProps={{className: styles.input}}
        type={type}
        disabled={disabled}
        {...otherProps}
      />
    </Grid>
  );
}

export default InputField;
