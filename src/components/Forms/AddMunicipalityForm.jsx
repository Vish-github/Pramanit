import React from "react";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";
import {ethers} from "ethers";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/AddMunicipalitySchema";

import muncipalityData from "../../../src/data/MuncipalityData.json";

const INITIAL_FORM_STATE = {
  username: "",
  password: "",
  location: "",
};

const onSubmit = (values, {resetForm}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  let signer = provider.getSigner(0);
  const address = "0x043f15c48edfBE55c70d3e8A69621363cB77Dde0";
  const contract = new ethers.Contract(address, Municipality.abi, signer);
  contract
    .AddMuncipality("0xc98d049254984b89920a86ca198Ab6edC32CE645", 123)
    .then((res) => {
      console.log("res", res);
    });
  resetForm({values: ""});
};

const AddMunicipalityForm = () => {
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
