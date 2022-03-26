import {Formik, Form} from "formik";

import {Grid} from "@mui/material";
import Button from "../Forms/FormUI/ButtonWrapper";

import FORM_VALIDATION from "../../FormValidationSchemas/MunicipalityLoginSchema.js";
import InputField from "../../../UI/InputField";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
};

const onSubmit = (values, {resetForm}) => {
  console.log(values);
  alert("Check Console for form data Object");
  resetForm({values: ""});
};

const MunicipalityLoginForm = () => {
  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <InputField name="username" title="Username" />
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
