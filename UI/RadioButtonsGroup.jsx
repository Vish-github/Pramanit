import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useField } from "formik";

import styles from "../styles/FormUI.module.css";

function InputField({ title = "", name = "", data, ...otherProps }) {
  const [field, meta] = useField(name);

  const configRadio = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <Grid
      item
      container
      sm={11}
      marginBottom={1}
      xs={12}
      display="flex"
      justifyContent="stretch"
      alignItems="center"
    >
      <Typography className={styles.label} style={{ marginRight: "100px" }}>
        {title}{" "}
      </Typography>
      <RadioGroup name={name} {...configRadio} row>
        {/* <Grid
          item
          container
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexGrow={1}
        > */}
        {data.map((item) => (
          <FormControlLabel
            value={item.value}
            control={<Radio {...otherProps} />}
            label={item.label}
            key={item.value}
          />
        ))}
        {/* </Grid> */}
      </RadioGroup>
    </Grid>
  );
}

export default InputField;
