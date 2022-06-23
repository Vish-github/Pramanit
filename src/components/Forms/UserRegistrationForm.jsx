import {useRouter} from "next/router";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import axios from "axios";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/UserRegistrationSchema.js";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const UserRegistrationForm = () => {
  const router = useRouter();

  const onSubmit = (values, {resetForm}) => {
    console.log(values);
    axios
      .post(`/api/register`, values)
      .then((res) => {
        console.log("Response", res);
        router.push("/login");
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
        <Grid container spacing={2} justifyContent="center" maxWidth="700px">
          <InputField title="Username" name="username" />
          <InputField title="Email" name="email" type="email" />
          <InputField title="Password" name="password" type="password" />
          <InputField
            title="Confirm Password"
            name="confirmPassword"
            type="password"
          />

          <Grid item sm={8} xs={12}>
            <Button>Sign Up</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default UserRegistrationForm;
