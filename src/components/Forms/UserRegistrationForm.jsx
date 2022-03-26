import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@mui/material";
import TextField from "../Forms/FormUI/TextFieldWrapper";
import Button from "../Forms/FormUI/ButtonWrapper";
import styles from "../../../styles/FormUI.module.css";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is Required."),
  email: Yup.string().email("Invalid email.").required("Email is Required."),
  password: Yup.string()
    .required("Password is Required.")
    .min(8, "Must contain minimum 8 characters.")
    .matches(/[a-zA-Z]/, "Password must contain letters."),
  confirmPassword: Yup.string()
    .label("Password Confirm")
    .required("Password is Required.")
    .oneOf([Yup.ref("password")], "Passwords does not match."),
});

const onSubmit = (values, { resetForm }) => {
  console.log(values);
  alert("Check Console for form data Object");
  resetForm({ values: "" });
};

const UserRegistrationForm = () => {
  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center" maxWidth="700px">
          <Grid item sm={10}>
            <Typography className={styles.label}>Username</Typography>
            <TextField
              name="username"
              InputProps={{ className: styles.input }}
            />
          </Grid>
          <Grid item sm={10}>
            <Typography className={styles.label}>Email</Typography>
            <TextField
              name="email"
              type="email"
              InputProps={{ className: styles.input }}
            />
          </Grid>
          <Grid item sm={10}>
            <Typography className={styles.label}>Password</Typography>
            <TextField
              name="password"
              type="password"
              InputProps={{ className: styles.input }}
            />
          </Grid>
          <Grid item sm={10}>
            <Typography className={styles.label}>Confirm Password</Typography>
            <TextField
              name="confirmPassword"
              type="password"
              InputProps={{ className: styles.input }}
            />
          </Grid>

          <Grid item sm={8}>
            <Button>Sign Up</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default UserRegistrationForm;
