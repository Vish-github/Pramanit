import * as Yup from "yup";
import {parse, isDate} from "date-fns";

const SUPPORTED_FORMATS = ["application/pdf"];
const FILE_SIZE = 5 * 1024 * 1024;
const maxDate = new Date();
const minDate = new Date("01-01-1901");

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
}

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("First name is Required."),
  lastName: Yup.string().required("Last name is Required."),
  fatherName: Yup.string().required("Father's name is Required."),
  motherName: Yup.string().required("Mother's name is Required."),
  dateOfDeath: Yup.date()
    .required("Date of Birth is Required")
    .transform(parseDateString)
    .max(maxDate, "Date of Birth cannot be in the future")
    .min(minDate, "Date of Birth is unrealistic"),
  placeOfDeath: Yup.string().required("Place of birth is Required."),
  permanentAddress: Yup.string().required("Permanent Address is Required."),
  addressAtTimeOfDeath: Yup.string().required("Address is Required."),
  gender: Yup.string().required(),
  reasonOfDeath: Yup.string().required(),
  muncipalityLocation: Yup.string().required(
    "Muncipality location is Required."
  ),
  proofOfDeath: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  ageProof: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  identityproof: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  addressProof: Yup.mixed()
    .required("File is required")
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported file type",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export default FORM_VALIDATION;
