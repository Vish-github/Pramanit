import { Formik, Form } from "formik";
import { Grid, Typography } from "@mui/material";

import Button from "./FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import FileUpload from "../../../UI/FileUpload";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";
import { useEffect, useState } from "react";

import Axios from "axios";
import ViewFiles from "../ViewFiles";

const ViewCertificateForm = () => {
  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    childFirstName: "",
    childLastName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "2022-04-15",
    placeOfBirth: "",
    address: "",
    fatherNationality: "",
    motherNationality: "",
    gender: "male",
    grandFatherName: "",
    grandMotherName: "",
    fatherIdentityProof: null,
    motherIdentityProof: null,
    addressProof: null,
    birthProof: null,
    dateApplied: "",
    applierEmail: "",
  });

  const [isDisabled, setisDisabled] = useState(true);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    alert("Check Console for form data Object");
    // resetForm({ values: "" });
  };

  useEffect(() => {
    setINITIAL_FORM_STATE({
      ...INITIAL_FORM_STATE,
      childFirstName: "Eren",
      childLastName: "Yeager",
      fatherName: "Grisha Yeager",
      motherName: "Carla Yeager",
      dateOfBirth: "2012-04-15",
      placeOfBirth: "Wall Maria",
      address: "Shinganshina District",
      fatherNationality: "Eldian",
      motherNationality: "Eldian",
      gender: "male",
      grandFatherName: "xyz Yeager",
      grandMotherName: "abc Yeager",
      dateApplied: "2022-08-04",
      applierEmail: "xyz@gmail.com",
      fatherIdentityProof: "https://bitcoin.org/bitcoin.pdf",
      motherIdentityProof: "https://ethereum.github.io/yellowpaper/paper.pdf",
      addressProof: "https://solana.com/solana-whitepaper.pdf",
      birthProof: "https://www.getmonero.org/library/Zero-to-Monero-1-0-0.pdf",
    });
  }, []);

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
              <InputField
                title="Child's first name"
                name="childFirstName"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Child's last name"
                name="childLastName"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Father's name"
                name="fatherName"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Mother's name"
                name="motherName"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <DateTime
                title="Child's Date of Birth"
                name="dateOfBirth"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Child's place of Birth"
                name="placeOfBirth"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField
                title="Parent's Adress"
                name="address"
                smwidth={11}
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Father's nationality"
                name="fatherNationality"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Mother's nationality"
                name="motherNationality"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <RadioButtonsGroup
                disabled={isDisabled}
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
              <InputField
                title="Grandfather's name"
                name="grandFatherName"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Grandmother's name"
                name="grandMotherName"
                disabled={isDisabled}
              />
            </InputGroup>

            <Grid item xs={11} marginTop={2}>
              <ViewFiles
                files={[
                  {
                    link: formProps.values.fatherIdentityProof,
                    title: "Father's Identity Proof",
                  },
                  {
                    link: formProps.values.motherIdentityProof,
                    title: "Mother's Identity Proof",
                  },
                  {
                    link: formProps.values.addressProof,
                    title: "Address Proof",
                  },
                  {
                    link: formProps.values.birthProof,
                    title: "Birth Proof",
                  },
                ]}
              />
            </Grid>

            <InputGroup>
              <InputField
                title="Date Applied"
                name="dateApplied"
                disabled={isDisabled}
              />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Applier Email"
                name="applierEmail"
                disabled={isDisabled}
              />
            </InputGroup>

            <Grid item sm={3} xs={10}>
              <Button color="success">Issue</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ViewCertificateForm;
