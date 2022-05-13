import { Formik, Form } from "formik";
import { Grid, Typography } from "@mui/material";
import moment from "moment";

import Button from "./FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import FileUpload from "../../../UI/FileUpload";
import Select from "../../../UI/SelectField";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";
import { useEffect, useState } from "react";

import muncipalityData from "../../../src/data/MuncipalityData.json";

import Axios from "axios";
import { useRouter } from "next/router";

import ViewFiles from "../ViewFiles";

const ViewCertificateForm = () => {
  const router = useRouter();

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
    muncipalityLocation: "",
    fatherIdentityProof: null,
    motherIdentityProof: null,
    addressProof: null,
    birthProof: null,
    dateApplied: "",
    applierEmail: "",
  });

  useEffect(() => {
    const { id: ID } = router.query;
    const url = `/api/Indivisual_certificate/applicant_id?id=${ID}`;
    console.log(ID);

    const fetchData = async () => {
      try {
        const response = await Axios.get(url);
        const data = response.data.allData.data;
        const email = response.data.allData.email;

        const details = {
          childFirstName: data.childFirstName,
          childLastName: data.childLastName,
          fatherName: data.fatherName,
          motherName: data.motherName,
          dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
          placeOfBirth: data.placeOfBirth,
          address: data.address,
          fatherNationality: data.fatherNationality,
          motherNationality: data.motherNationality,
          gender: data.gender,
          grandFatherName: data.grandFatherName,
          grandMotherName: data.grandMotherName,
          muncipalityLocation: data.muncipalityLocation,
          fatherIdentityProof: data.fatherIdentityProof.replace(".pdf", ".jpg"),
          motherIdentityProof: data.motherIdentityProof.replace(".pdf", ".jpg"),
          addressProof: data.addressProof.replace(".pdf", ".jpg"),
          birthProof: data.birthProof.replace(".pdf", ".jpg"),
          dateApplied: moment(data.createdAt).format("YYYY-MM-DD"),
          applierEmail: email,
        };

        setINITIAL_FORM_STATE(details);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const [isDisabled, setisDisabled] = useState(true);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    alert("Check Console for form data Object");
    // resetForm({ values: "" });
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

            <InputGroup display="flex" justifyContent="center" width="100%">
              <RadioButtonsGroup
                title="Gender of Child"
                name="gender"
                disabled={isDisabled}
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "others", label: "Others" },
                ]}
              />
            </InputGroup>

            <InputGroup>
              <Select
                title="Muncipality Location"
                name="muncipalityLocation"
                options={muncipalityData}
                disabled={isDisabled}
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
