import * as Yup from "yup";

const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Username is Required."),
  email: Yup.string().email("Invalid email.").required("Email is Required."),
  password: Yup.string()
    .required("Password is Required.")
    .min(8, "Must contain minimum 8 characters.")
    .matches(/[a-zA-Z]/, "Password must contain letters."),
  confirmPassword: Yup.string()
    .label("Password Confirm")
    .required("Password is Required.")
    .oneOf([Yup.ref("password")], "Passwords does not match."),
});

export default FORM_VALIDATION;
