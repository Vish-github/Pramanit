import {useRouter} from "next/router";

import {Formik, Form} from "formik";

import {Grid} from "@mui/material";
import Button from "../Forms/FormUI/ButtonWrapper";

import FORM_VALIDATION from "../../FormValidationSchemas/MunicipalityLoginSchema.js";
import InputField from "../../../UI/InputField";

import axios from "axios";

import {connect} from "react-redux";
import {addMunicipalityToken} from "../../../redux/actions/municipality.action";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const MunicipalityLoginForm = ({addMunicipalityDetails}) => {
  const router = useRouter();

  const onSubmit = (values, {resetForm}) => {
    axios
      .post("/api/municipality_login", values)
      .then((res) => {
        console.log("Response", res.data);
        addMunicipalityDetails(res.data);
        router.push("/municipality_dashboard");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    resetForm({values: ""});
  };

  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <InputField name="email" title="email" />
          <InputField name="password" title="Password" type="password" />
          <Grid item sm={8} xs={12}>
            <Button>Login</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  municipality: state.municipality?.municipality,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addMunicipalityDetails: (param) => dispatch(addMunicipalityToken(param)),
    reset: () => dispatch(reset()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MunicipalityLoginForm);
