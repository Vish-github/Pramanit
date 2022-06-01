import {useRouter} from "next/router";

import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";

import FORM_VALIDATION from "../../FormValidationSchemas/UserLoginSchema.js";

import axios from "axios";

import {connect} from "react-redux";
import {addToken, removeToken} from "../../../redux/actions/token.action";

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const LoginForm = ({addUserDetails}) => {
  const router = useRouter();

  const onSubmit = (values, {resetForm}) => {
    axios
      .post(`/api/login`, values)
      .then((res) => {
        addUserDetails(res.data.user);
        localStorage.setItem("pramanit", JSON.stringify(res.data.user));
        resetForm({values: ""});
        router.push("/userdashboard");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={2} justifyContent="center">
          <InputField title="Email" name="email" />
          <InputField title="Password" name="password" type="password" />
          <Grid item sm={8} xs={12}>
            <Button>Login</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

const mapStateToProps = (state) => ({
  token: state.token?.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addUserDetails: (param) => dispatch(addToken(param)),
    removeUserDetails: () => dispatch(removeToken()),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
