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

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";

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

const ApplyCertificateForm = ({
  accesstoken,
  openSnackbarmessage,
  updateToken,
}) => {
  const router = useRouter();

  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    childFirstName: "",
    childLastName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: currDate(),
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
        formData.append("file", values.fatherIdentityProof);

        axios
          .post(`/api/upload-url`, formData)
          .then((res) => {
            console.log("fatherIdentityProof", res?.data?.url);
            newApplication.fatherIdentityProof = res?.data?.url;
            let formData = new FormData();
            formData.append("upload_preset", "my-uploads");
            formData.append("file", values.motherIdentityProof);
            axios
              .post(`/api/upload-url`, formData)
              .then((res) => {
                console.log("motherIdentityProof", res?.data?.url);
                newApplication.motherIdentityProof = res?.data?.url;
                let formData = new FormData();
                formData.append("upload_preset", "my-uploads");
                formData.append("file", values.birthProof);
                axios
                  .post(`/api/upload-url`, formData)
                  .then((res) => {
                    console.log("birthProof", res?.data?.url);
                    newApplication.birthProof = res?.data?.url;
                    newApplication.applicant_id = accesstoken._id;
                    console.log("newApplication", newApplication);
                    axios
                      .post("/api/apply_birth_certificate", newApplication)
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

            <InputGroup display="flex" justifyContent="center" width="100%">
              <RadioButtonsGroup
                title="Gender of Child"
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
)(ApplyCertificateForm);
