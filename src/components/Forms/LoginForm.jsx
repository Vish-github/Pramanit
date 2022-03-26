import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@mui/material";
import TextField from "../Forms/FormUI/TextFieldWrapper";
import Button from "../Forms/FormUI/ButtonWrapper";
import styles from "../../../styles/FormUI.module.css";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is Required."),
  password: Yup.string()
    .required("Password is Required.")
    .min(8, "Must contain minimum 8 characters.")
    .matches(/[a-zA-Z]/, "Password must contain letters."),
});

const onSubmit = (values, { resetForm }) => {
  console.log(values);
  alert("Check Console for form data Object");
  resetForm({ values: "" });
};

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <Grid item sm={10}>
            <Typography className={styles.label}>Username</Typography>
            <TextField
              name="username"
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

          <Grid item sm={8}>
            <Button>Login</Button>
          </Grid>

          {/* <Grid item sm={8} >
            <Typography align='center' >Do not have an account? Sign Up</Typography>
          </Grid> */}
        </Grid>
      </Form>
    </Formik>
  );
};

export default LoginForm;
