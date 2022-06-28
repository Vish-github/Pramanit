import React from "react";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/AddThirdPartySchema";
import axios from "axios";

const INITIAL_FORM_STATE = {
  username: "",
  email: "",
  password: "",
};

const AddThirdPartyForm = ({setOpen}) => {
  const onSubmit = (values, {resetForm}) => {
    axios
      .post("/api/add_thirdparty", values)
      .then((res) => {
        console.log("Successs", res);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    setOpen(false);
    resetForm({values: ""});
  };
  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container justifyContent="center" alignSelf="flex-start">
          <InputField title="Username" name="username" />
          <InputField title="Email" name="email" />
          <InputField title="Password" name="password" type="password" />
          <Grid item sm={8} xs={12}>
            <Button color="success">Add Third party</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default AddThirdPartyForm;
