import {useRouter} from "next/router";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/UserLoginSchema.js";

import axios from "axios";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();

  const onSubmit = (values, {resetForm}) => {
    console.log(values);
    alert("Check Console for form data Object");
    resetForm({values: ""});
    axios
      .post(`/api/login`, values)
      .then((res) => {
        alert("Success");
        console.log("Response", res);
        router.push("/userdashboard");
      })      
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <InputField title="Email" name="email" />
          <InputField title="Password" name="password" type="password" />
          <Grid item sm={8} xs={12}>
            <Button>Login</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default LoginForm;
