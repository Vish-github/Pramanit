import {useState} from "react";
import {useRouter} from "next/router";

import {Formik, Form} from "formik";
import {Grid, Typography} from "@mui/material";
import axios from "axios";
import {connect} from "react-redux";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import FileUpload from "../../../UI/FileUpload";
import Select from "../../../UI/SelectField";
import Loader from "../../../UI/Loader";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyDeathCertificateSchema";

import muncipalityData from "../../../src/data/MuncipalityData.json";

import {openSnackbar} from "../../../redux/actions/snackbar.action";
import {addToken} from "../../../redux/actions/token.action";

const currDate = () => {
  let today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  today = yyyy + "-" + mm + "-" + dd;
  return today;
};

const ApplyDeathCertificateForm = ({
  accesstoken,
  openSnackbarmessage,
  updateToken,
}) => {
  const router = useRouter();

  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    dateOfDeath: currDate(),
    placeOfDeath: "",
    addressAtTimeOfDeath: "",
    permanentAddress: "",
    gender: "male",
    reasonOfDeath: "",
    muncipalityLocation: "",
    proofOfDeath: null,
    addressProof: null,
    ageProof: null,
    identityproof: null,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = (values, {resetForm}) => {
    let newApplication = values;
    setLoading(true);
    let formData = new FormData();
    formData.append("upload_preset", "my-uploads");
    formData.append("file", values.addressProof);
    axios
      .post(`/api/upload-url`, formData)
      .then((res) => {
        console.log("addressProof", res?.data?.url);
        newApplication.addressProof = res?.data?.url;
        let formData = new FormData();
        formData.append("upload_preset", "my-uploads");
        formData.append("file", values.proofOfDeath);

        axios
          .post(`/api/upload-url`, formData)
          .then((res) => {
            console.log("proofOfDeath", res?.data?.url);
            newApplication.proofOfDeath = res?.data?.url;
            let formData = new FormData();
            formData.append("upload_preset", "my-uploads");
            formData.append("file", values.ageProof);
            axios
              .post(`/api/upload-url`, formData)
              .then((res) => {
                console.log("ageProof", res?.data?.url);
                newApplication.ageProof = res?.data?.url;
                let formData = new FormData();
                formData.append("upload_preset", "my-uploads");
                formData.append("file", values.identityproof);
                axios
                  .post(`/api/upload-url`, formData)
                  .then((res) => {
                    console.log("identityproof", res?.data?.url);
                    newApplication.identityproof = res?.data?.url;
                    newApplication.applicant_id = accesstoken._id;
                    console.log("newApplication", newApplication);
                    axios
                      .post("/api/apply_death_certificate", newApplication)
                      .then((res) => {
                        console.log("response", res.data);
                        resetForm({values: ""});
                        setLoading(false);
                        openSnackbarmessage("Applied!");
                        updateToken(res.data);
                        localStorage.setItem(
                          "pramanit-user",
                          JSON.stringify(res.data)
                        );
                        router.push("/userdashboard");
                      })
                      .catch((err) => {
                        console.log("Error0:", err);
                      });
                  })
                  .catch((err) => {
                    console.log("Error4:", err);
                  });
              })
              .catch((err) => {
                console.log("Error3:", err);
              });
          })
          .catch((err) => {
            console.log("Error2:", err);
          });
      })
      .catch((err) => {
        console.log("Error1:", err);
      });
  };

  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
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
              <InputField title="Deceased's First Name" name="firstName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Deceased's Last Name" name="lastName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Father's name" name="fatherName" />
            </InputGroup>

            <InputGroup>
              <InputField title="Mother's name" name="motherName" />
            </InputGroup>

            <InputGroup>
              <DateTime title="Date of Death" name="dateOfDeath" />
            </InputGroup>

            <InputGroup>
              <InputField title="Place of Death" name="placeOfDeath" />
            </InputGroup>

            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField
                title="Permanent Address"
                name="permanentAddress"
                smwidth={11}
              />
            </InputGroup>
            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField
                title="Deceased's Address at the time of death"
                name="addressAtTimeOfDeath"
                smwidth={11}
              />
            </InputGroup>

            <InputGroup display="flex" justifyContent="center" width="100%">
              <RadioButtonsGroup
                title="Gender of Deceased"
                name="gender"
                data={[
                  {value: "male", label: "Male"},
                  {value: "female", label: "Female"},
                  {value: "others", label: "Others"},
                ]}
              />
            </InputGroup>

            <InputGroup>
              <Select
                title="Muncipality Location"
                name="muncipalityLocation"
                options={muncipalityData}
              />
            </InputGroup>
            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField
                title="Reason of Death"
                name="reasonOfDeath"
                smwidth={11}
              />
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
                    name: "proofOfDeath",
                    title: "Proof of Death",
                  },
                  {
                    name: "addressProof",
                    title: "Proof of Address",
                  },
                  {
                    name: "ageProof",
                    title: "Proof of Age",
                  },

                  {
                    name: "identityproof",
                    title: "Proof of Identity",
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              sm={3}
              xs={10}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {loading && <Loader />}
              <Button>Apply</Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  accesstoken: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbarmessage: (param) => dispatch(openSnackbar(param)),
    updateToken: (param) => dispatch(addToken(param)),
    reset: () => dispatch(reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyDeathCertificateForm);
