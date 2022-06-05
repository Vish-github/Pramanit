import * as Yup from "yup";

const FORM_VALIDATION = Yup.object().shape({
  reason: Yup.string().required("Reason is Required."),
});

export default FORM_VALIDATION;
