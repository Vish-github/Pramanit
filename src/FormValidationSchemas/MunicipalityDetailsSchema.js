import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];
const FILE_SIZE = 5 * 1024 * 1024;

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required("Name is Required."),
  email: Yup.string()
    .email("Not a valid email")
    .required("Last name is Required."),
  addressLine1: Yup.string().required("Address is Required."),
  addressLine2: Yup.string().required("Address is Required."),
  addressLine3: Yup.string().required("Address is Required."),
  code: Yup.string().required("Code is Required."),
  pincode: Yup.string()
    .length(6, "Length should be 6 characters")
    .required("Pincode is Required."),
  issuingauthorityname: Yup.string().required(
    "grandfather's name is Required."
  ),
  issuingauthoritysign: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File is too large", (value) => {
      console.log("type", typeof value);
      if (typeof value != "object") {
        return true;
      } else {
        return value && value.size <= FILE_SIZE;
      }
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (typeof value != "object") {
        return true;
      } else {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    }),
  municipalityseal: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File is too large", (value) => {
      if (typeof value != "object") {
        return true;
      } else {
        returnvalue && value.size <= FILE_SIZE;
      }
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (typeof value != "object") {
        return true;
      } else {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    }),
  cheifregistrarsign: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File is too large", (value) => {
      if (typeof value != "object") {
        return true;
      } else {
        return value && value.size <= FILE_SIZE;
      }
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (typeof value != "object") {
        return true;
      } else {
        return value && SUPPORTED_FORMATS.includes(value.type);
      }
    }),
});

export default FORM_VALIDATION;
