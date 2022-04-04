import * as Yup from "yup";

const FORM_VALIDATION = Yup.object().shape({
  childFirstName: Yup.string().required("First name is Required."),
  childLastName: Yup.string().required("Last name is Required."),
  fatherName: Yup.string().required("Father's name is Required."),
  motherName: Yup.string().required("Mother's name is Required."),
  dateOfBirth: Yup.date().required("Date of Birth is Required"),
  placeOfBirth: Yup.string().required("Place of birth is Required."),
  address: Yup.string().required("Adress is Required."),
  fatherNationality: Yup.string().required("father's nationality is Required."),
  motherNationality: Yup.string().required("mother's nationality is Required."),
  gender: Yup.string().required(),
  grandFatherName: Yup.string().required("grandfather's name is Required."),
  grandMotherName: Yup.string().required("grandmother's name is Required."),
});

export default FORM_VALIDATION;
