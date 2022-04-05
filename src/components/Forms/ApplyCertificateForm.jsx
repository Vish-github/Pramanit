import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import Button from "../Forms/FormUI/ButtonWrapper";
import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import RadioButtonsGroup from "../../../UI/RadioButtonsGroup";
import DateTime from "../../../UI/DateTime";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplyCertificateSchema";

const INITIAL_FORM_STATE = {
  childFirstName: "",
  childLastName: "",
  fatherName: "",
  motherName: "",
  dateOfBirth: "2005-04-15",
  placeOfBirth: "",
  address: "",
  fatherNationality: "",
  motherNationality: "",
  gender: "female",
  grandFatherName: "",
  grandMotherName: "",
};

const onSubmit = (values, {resetForm}) => {
  console.log(values);
  alert("Check Console for form data Object");
  resetForm({values: ""});
};

const ApplyCertificateForm = () => {
  return (
    <Formik
      initialValues={{...INITIAL_FORM_STATE}}
      validationSchema={FORM_VALIDATION}
      onSubmit={onSubmit}
    >
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
            <InputField title="Child's first name" name="childFirstName" />
          </InputGroup>

          <InputGroup>
            <InputField title="Child's last name" name="childLastName" />
          </InputGroup>

          <InputGroup>
            <InputField title="Father's name" name="fatherName" />
          </InputGroup>

          <InputGroup>
            <InputField title="Mother's name" name="motherName" />
          </InputGroup>

          <InputGroup>
            <DateTime title="Child's Date of Birth" name="dateOfBirth" />
          </InputGroup>

          <InputGroup>
            <InputField title="Child's place of Birth" name="placeOfBirth" />
          </InputGroup>

          <InputGroup full display="flex" justifyContent="center" width="100%">
            <InputField title="Parent's Adress" name="address" smwidth={11} />
          </InputGroup>

          <InputGroup>
            <InputField title="Father's nationality" name="fatherNationality" />
          </InputGroup>

          <InputGroup>
            <InputField title="Mother's nationality" name="motherNationality" />
          </InputGroup>

          <InputGroup full>
            <RadioButtonsGroup
              title="Gender of Child"
              name="gender"
              data={[
                {value: "male", label: "Male"},
                {value: "female", label: "Female"},
                {value: "others", label: "Others"},
              ]}
            />
          </InputGroup>

          <InputGroup>
            <InputField title="Grandfather's name" name="grandFatherName" />
          </InputGroup>

          <InputGroup>
            <InputField title="Grandmother's name" name="grandMotherName" />
          </InputGroup>

          <Grid item sm={3} xs={10}>
            <Button>Apply</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default ApplyCertificateForm;
