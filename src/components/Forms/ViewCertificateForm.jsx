import {Formik, Form} from "formik";
import {Grid} from "@mui/material";
import moment from "moment";

import Button from "./FormUI/ButtonWrapper";
import ButtonMaterial from "@mui/material/Button";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import Select from "../../../UI/SelectField";
import Modal from "../../../layout/Modal";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";
import {useEffect, useState} from "react";

import muncipalityData from "../../../src/data/MuncipalityData.json";

import Axios from "axios";

import ViewFiles from "../ViewFiles";
import ApplicationrejectionForm from "./ApplicationrejectionForm";

import {ethers} from "ethers";

import Municipality from "../../../Project_SmartContract/build/contracts/Muncipality.json";

const ViewCertificateForm = ({query}) => {
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
  const [verified, setVerified] = useState({
    fatherIdentityProof: false,
    motherIdentityProof: false,
    addressProof: false,
    birthProof: false,
  });

  useEffect(async () => {
    const url = `/api/Indivisual_certificate/applicant_id?id=${query}`;

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

  const [open, setOpen] = useState(false);

  const onSubmit = (values, {resetForm}) => {
    if (
      !(
        verified.addressProof &&
        verified.birthProof &&
        verified.fatherIdentityProof &&
        verified.motherIdentityProof
      )
    ) {
      alert("Please verify all documents");
    } else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner(0);
      const address = "0x89d5945ec274c7561fB4651152dabF155aD03a63";
      const contract = new ethers.Contract(address, Municipality.abi, signer);
      // await contract
      //   .AddUserBirthHash(
      //     121,
      //     18,
      //     "Qmd63gzHfXCsJepsdTLd4cqigFa7SuCAeH6smsVoHovdbE"
      //   )
      //   .then((res) => {
      //     console.log("hello", res);
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //   });

      //  contract
      //    .getBirthCertificate(16)
      //    .then((res) => {
      //      console.log("res", res);
      //    })
      //    .catch((err) => {
      //      console.log("error", err);
      //    });
    }
  };

  return (
    <>
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
                      viewed: verified.fatherIdentityProof,
                      onClick: () =>
                        setVerified({
                          ...verified,
                          fatherIdentityProof: true,
                        }),
                    },
                    {
                      link: formProps.values.motherIdentityProof,
                      title: "Mother's Identity Proof",
                      viewed: verified.motherIdentityProof,
                      onClick: () =>
                        setVerified({
                          ...verified,
                          motherIdentityProof: true,
                        }),
                    },
                    {
                      link: formProps.values.addressProof,
                      title: "Address Proof",
                      viewed: verified.addressProof,
                      onClick: () =>
                        setVerified({
                          ...verified,
                          addressProof: true,
                        }),
                    },
                    {
                      link: formProps.values.birthProof,
                      title: "Birth Proof",
                      viewed: verified.birthProof,
                      onClick: () =>
                        setVerified({
                          ...verified,
                          birthProof: true,
                        }),
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

              <Grid
                item
                sm={6}
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button color="success" style={{marginRight: "50px"}}>
                  Issue
                </Button>
                <ButtonMaterial
                  color="error"
                  onClick={() => setOpen(true)}
                  variant="contained"
                  style={{
                    width: "100%",
                  }}
                >
                  Reject
                </ButtonMaterial>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Modal open={open} setOpen={setOpen}>
        <ApplicationrejectionForm />
      </Modal>
    </>
  );
};

export default ViewCertificateForm;
