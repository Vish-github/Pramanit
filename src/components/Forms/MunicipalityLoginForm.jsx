import {useRouter} from "next/router";

import {Formik, Form} from "formik";

import {Grid} from "@mui/material";
import Button from "../Forms/FormUI/ButtonWrapper";

import FORM_VALIDATION from "../../FormValidationSchemas/MunicipalityLoginSchema.js";
import InputField from "../../../UI/InputField";
import axios from "axios";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const MunicipalityLoginForm = () => {
  const router = useRouter();

  const onSubmit = (values, {resetForm}) => {
    axios
      .post("/api/municipality_login", values)
      .then((res) => {
        console.log("Response", res);
        alert("Login Success");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    resetForm({values: ""});
    router.push("/municipality_dashboard");
  };

  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <InputField name="email" title="email" />
          <InputField name="password" title="Password" type="password" />
          <Grid item sm={8} xs={12}>
            <Button>Login</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default MunicipalityLoginForm;
