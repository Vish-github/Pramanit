import React from "react";

import { Formik, Form } from "formik";
import { Grid } from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/AddMunicipalitySchema";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  location: "",
};

const onSubmit = (values, { resetForm }) => {
  console.log(values);
  alert("Check Console for form data Object");
  resetForm({ values: "" });
};

const AddMunicipalityForm = () => {
  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center" alignSelf="flex-start">
          <InputField title="User Name" name="username" />
          <InputField title="Password" name="password" type="password" />
          <InputField title="Location" name="location" />
          <Grid item sm={8} xs={12}>
            <Button color="success">Grant Access</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddMunicipalityForm;
