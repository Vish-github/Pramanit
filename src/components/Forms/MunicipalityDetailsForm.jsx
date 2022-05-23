import {useState, useEffect} from "react";
import {useRouter} from "next/router";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";
import axios from "axios";
import {connect} from "react-redux";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";

import CertificateUploadAndView from "../MunicipalityDashboard/CertificateUploadAndView";
import Loader from "../../../UI/Loader";

import FORM_VALIDATION from "../../FormValidationSchemas/MunicipalityDetailsSchema";

import {openSnackbar} from "../../../redux/actions/snackbar.action";

const MunicipalityDetails = ({accesstoken, openSnackbarmessage}) => {
  const router = useRouter();
  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    name: "",
    email: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    code: "",
    pincode: "",
    issuingauthoritysign: "",
    issuingauthorityname: "",
    municipalityseal: "",
    cheifregistrarsign: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .post("/api/get_municipality_details", {
        email: "panajimunicipality@gmail.com",
      })
      .then((res) => {
        console.log("res", res);
        setINITIAL_FORM_STATE(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  const onSubmit = async (values, {resetForm}) => {
    let updateMunicipalityDetails = values;
    setLoading(true);
    if (typeof values.issuingauthoritysign == "object") {
      let formData = new FormData();
      formData.append("upload_preset", "my-uploads");
      formData.append("file", values.issuingauthoritysign);
      let response = await axios.post(`/api/upload-url`, formData);
      console.log("issuingauthoritysign", response?.data?.url);
      updateMunicipalityDetails.issuingauthoritysign = response?.data?.url;
    }
    if (typeof values.municipalityseal == "object") {
      let formData = new FormData();
      formData.append("upload_preset", "my-uploads");
      formData.append("file", values.municipalityseal);
      let response = await axios.post(`/api/upload-url`, formData);
      console.log("municipalityseal", response?.data?.url);
      updateMunicipalityDetails.municipalityseal = response?.data?.url;
    }
    if (typeof values.cheifregistrarsign == "object") {
      let formData = new FormData();
      formData.append("upload_preset", "my-uploads");
      formData.append("file", values.cheifregistrarsign);
      let response = await axios.post(`/api/upload-url`, formData);
      console.log("cheifregistrarsign", response?.data?.url);
      updateMunicipalityDetails.cheifregistrarsign = response?.data?.url;
    }
    console.log("updateMunicipalityDetails", updateMunicipalityDetails);
    axios
      .put("/api/update_municipality_details", updateMunicipalityDetails)
      .then((res) => {
        console.log("response", res);
        resetForm({values: ""});
        setLoading(false);
        openSnackbarmessage("Applied!");
        router.push("/municipality_dashboard");
      })
      .catch((err) => {
        console.log("Error0:", err);
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
              <InputField title="Name" name="name" disabled={true} />
            </InputGroup>

            <InputGroup>
              <InputField title="Email" name="email" disabled={true} />
            </InputGroup>

            <InputGroup>
              <InputField title="Address Line 1" name="addressLine1" />
            </InputGroup>

            <InputGroup>
              <InputField title="Address Line 2" name="addressLine2" />
            </InputGroup>
            <InputGroup>
              <InputField title="Address Line 3" name="addressLine3" />
            </InputGroup>

            <InputGroup>
              <InputField title="Code" name="code" />
            </InputGroup>

            <InputGroup>
              <InputField title="Pincode" name="pincode" />
            </InputGroup>

            <InputGroup>
              <InputField
                title="Issuing Authority Name"
                name="issuingauthorityname"
              />
            </InputGroup>

            <Grid item xs={12} marginTop={2}>
              <CertificateUploadAndView
                formProps={formProps}
                fileProps={[
                  {
                    name: "issuingauthoritysign",
                    title: "Issuing Authority Sign",
                  },
                  {
                    name: "municipalityseal",
                    title: "Municipality Seal",
                  },
                  {
                    name: "cheifregistrarsign",
                    title: "Cheif Registrar sign",
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
              <Button>Update</Button>
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
    reset: () => dispatch(reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MunicipalityDetails);
