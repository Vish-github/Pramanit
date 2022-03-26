import {Grid, Typography} from "@mui/material";

import TextField from "../src/components/Forms/FormUI/TextFieldWrapper";

import styles from "../styles/FormUI.module.css";

function InputField({title = "", name = "", type = ""}) {
  return (
    <Grid item sm={10} marginBottom={1}>
      <Typography className={styles.label}>{title}</Typography>
      <TextField
        name={name}
        InputProps={{className: styles.input}}
        type={type}
      />
    </Grid>
  );
}

export default InputField;
