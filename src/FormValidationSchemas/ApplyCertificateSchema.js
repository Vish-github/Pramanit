import * as Yup from "yup";
import { parse, isDate } from "date-fns";

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
  childFirstName: Yup.string().required("First name is Required."),
  childLastName: Yup.string().required("Last name is Required."),
  fatherName: Yup.string().required("Father's name is Required."),
  motherName: Yup.string().required("Mother's name is Required."),
  dateOfBirth: Yup.date()
    .required("Date of Birth is Required")
    .transform(parseDateString)
    .max(maxDate, "Date of Birth cannot be in the future")
    .min(minDate, "Date of Birth is unrealistic"),
  placeOfBirth: Yup.string().required("Place of birth is Required."),
  address: Yup.string().required("Adress is Required."),
  fatherNationality: Yup.string().required("father's nationality is Required."),
  motherNationality: Yup.string().required("mother's nationality is Required."),
  gender: Yup.string().required(),
  grandFatherName: Yup.string().required("grandfather's name is Required."),
  grandMotherName: Yup.string().required("grandmother's name is Required."),
  fatherIdentityProof: Yup.mixed()
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
  motherIdentityProof: Yup.mixed()
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
  birthProof: Yup.mixed()
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
