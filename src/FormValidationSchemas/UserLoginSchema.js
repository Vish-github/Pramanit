import * as Yup from "yup";

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is Required."),
  password: Yup.string()
    .required("Password is Required.")
    .min(8, "Must contain minimum 8 characters.")
    .matches(/[a-zA-Z]/, "Password must contain letters."),
});

export default FORM_VALIDATION;
