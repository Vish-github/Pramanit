import {useState, useEffect} from "react";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";
import {useRouter} from "next/router";

import Button from "./FormUI/ButtonWrapper";
import ButtonMaterial from "@mui/material/Button";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";
import Select from "../../../UI/SelectField";
import Modal from "../../../layout/Modal";

import muncipalityData from "../../../src/data/MuncipalityData.json";

import ViewFiles from "../ViewFiles";
import ApplicationrejectionForm from "./ApplicationrejectionForm";

import {ethers} from "ethers";
import axios from "axios";

import Municipality from "../../../Project_SmartContract/build/contracts/Muncipality.json";
import Loader from "../../../UI/Loader2";

const ViewCertificateForm = ({INITIAL_FORM_STATE}) => {
  const [verified, setVerified] = useState({
    fatherIdentityProof: false,
    motherIdentityProof: false,
    addressProof: false,
    birthProof: false,
  });

  const [isDisabled, setisDisabled] = useState(true);

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // setIsLoading(true);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // let signer = provider.getSigner(0);
    // const address = "0xfABbD44e3fc0b68D1F5a12664a5693672ecBed58";
    // const contract = new ethers.Contract(address, Municipality.abi, signer);
    // let id = JSON.stringify(INITIAL_FORM_STATE?.id);
  }, []);

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
      console.log("values", values);
      axios
        .post("/api/ipfs_data", values)
        .then((hash) => {
          console.log("res", hash.data);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          let signer = provider.getSigner(0);
          const address = "0xfABbD44e3fc0b68D1F5a12664a5693672ecBed58";
          const contract = new ethers.Contract(
            address,
            Municipality.abi,
            signer
          );
          let id = JSON.stringify(INITIAL_FORM_STATE?.id);
          let hash1 = JSON.stringify(hash.data);
          console.log(id, hash1);
          contract
            .AddUserBirthHash(
              123,
              JSON.stringify(INITIAL_FORM_STATE?.id),
              JSON.stringify(hash.data)
            )
            .then((res) => {
              console.log("hello", res);
              console.log("id", INITIAL_FORM_STATE?.id);
              axios.post("/api/birth_certificate_granted", {
                id: INITIAL_FORM_STATE?.certiid,
                birthhash: hash.data,
                birthtransaction: res.hash,
                email: INITIAL_FORM_STATE?.applierEmail,
              });
            })
            .then((res) => {
              console.log("res", res);
              router.push("/municipality_dashboard");
            })
            .catch((err) => {
              console.log("error", err);
            });
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={{...INITIAL_FORM_STATE}}
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
                    showverify={INITIAL_FORM_STATE.issued == 0 ? true : false}
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
                {INITIAL_FORM_STATE.issued == 0 && (
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
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <Modal open={open} setOpen={setOpen}>
        <ApplicationrejectionForm
          email={INITIAL_FORM_STATE?.email}
          id={INITIAL_FORM_STATE?.certiid}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ViewCertificateForm;
