import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/UserLoginSchema.js";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const LoginForm = ({onsubmit}) => {
  const onSubmit = (values, {resetForm}) => {
    onsubmit(values);
    resetForm({values: ""});
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
