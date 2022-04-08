import { Formik, Form } from "formik";
import { Grid, Typography } from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import FileUpload from "../../../UI/FileUpload";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";
import { useState } from "react";

import Axios from "axios";

const ApplyCertificateForm = () => {
  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    childFirstName: "",
    childLastName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "2022-04-01",
    placeOfBirth: "",
    address: "",
    fatherNationality: "",
    motherNationality: "",
    gender: "male",
    grandFatherName: "",
    grandMotherName: "",
    fatherIdentityProof: null,
    mothreIdentityProof: null,
    addressProof: null,
    birthProof: null,
  });

  const onSubmit = (values, { resetForm }) => {
    let formData = new FormData();

    formData.append("fatherIdentityProof", values.fatherIdentityProof);
    formData.append("motherIdentityProof", values.mothreIdentityProof);
    formData.append("addressProof", values.addressProof);
    formData.append("birthProof", values.birthProof);

    const url = "https://v2.convertapi.com/upload";

    Axios.post(url, { values, formData }, {})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(values);
    alert("Check Console for form data Object");
    resetForm({ values: "" });
  };

  return (
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(formProps) => (
        <Form>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={4}
          >
            <InputGroup>
              <InputField title="Child's first name" name="childFirstName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Child's last name" name="childLastName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Father's name" name="fatherName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Mother's name" name="motherName" />
            </InputGroup>

            <InputGroup>
              <DateTime title="Child's Date of Birth" name="dateOfBirth" />
            </InputGroup>

            <InputGroup>
              <InputField title="Child's place of Birth" name="placeOfBirth" />
            </InputGroup>

            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField title="Parent's Adress" name="address" smwidth={11} />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Father's nationality"
                name="fatherNationality"
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Mother's nationality"
                name="motherNationality"
              />
            </InputGroup>

            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <RadioButtonsGroup
                title="Gender of Child"
                name="gender"
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "others", label: "Others" },
                ]}
              />
            </InputGroup>

            <InputGroup>
              <InputField title="Grandfather's name" name="grandFatherName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Grandmother's name" name="grandMotherName" />
            </InputGroup>

            <Grid item xs={11} marginTop={2}>
              <Typography
                color="primary"
                justifySelf="flex-start"
                marginBottom={1}
              >
                Please attach attested test copies of the following documents**
              </Typography>
              <FileUpload
                formProps={formProps}
                fileProps={[
                  {
                    name: "fatherIdentityProof",
                    title: "Father’s Identity Proof",
                  },
                  {
                    name: "motherIdentityProof",
                    title: "Mother’s Identity Proof",
                  },
                  {
                    name: "addressProof",
                    title: "Address Proof",
                  },

                  {
                    name: "birthProof",
                    title: "Birth Proof",
                  },
                ]}
              />
            </Grid>

            <Grid item sm={3} xs={10}>
              <Button>Apply</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ApplyCertificateForm;
