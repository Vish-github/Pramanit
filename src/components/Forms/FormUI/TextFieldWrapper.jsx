import {TextField} from "@mui/material";
import {useField} from "formik";
import React from "react";

const TextFieldWrapper = ({name, disabled = false, ...otherProps}) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    varient: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} disabled={disabled} />;
};

export default TextFieldWrapper;
