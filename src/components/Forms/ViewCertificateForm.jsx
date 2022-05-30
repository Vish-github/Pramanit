import {Formik, Form} from "formik";
import {Grid, Typography} from "@mui/material";
import moment from "moment";
import Web3 from "web3";

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
  const [isDisabled, setisDisabled] = useState(true);
  const [contract, setContract] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    loadWeb3();
    loadBlockchain();
  }, []);

  const onSubmit = (values, {resetForm}) => {
    console.log(values);
    alert("Check Console for form data Object");
    // resetForm({ values: "" });
  };
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchain = async () => {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // setAccount({account: accounts[0]});
    const networkId = await web3.eth.net.getId();
    const networkData = Municipality.networks[networkId];
    if (networkData) {
      const contract = new web3.eth.Contract(
        Municipality.abi,
        networkData.address
      );
      setContract(contract);
      // contract.methods
      //   .AddMuncipality("0x3A8A957FcA0b4d153547A9517b18bc954Cf0cFDe", 1234)
      //   .call()
      //   .then((res) => {
      //     console.log("res", res);
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //   });
      contract.methods
        .AddUserBirthHash(
          1234,
          125,
          "Qmd63gzHfXCsJepsdTLd4cqigFa7SuCAeH6smsVoHovdbE"
        )
        .call()
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
      // const memeHash = await contract.methods.getAData(0).call();
      // setNewfilehash(memeHash[0]);
      // console.log("memeHash", memeHash[0]);
      console.log("contact", contract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
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
