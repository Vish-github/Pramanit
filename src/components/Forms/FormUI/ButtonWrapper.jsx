import { Button } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import styles from "../../../../styles/FormUI.module.css";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    variant: "contained",
    // color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };

  return (
    <Button {...configButton} className={styles.button}>
      <span className={styles.buttonText}>{children}</span>
    </Button>
  );
};

export default ButtonWrapper;
