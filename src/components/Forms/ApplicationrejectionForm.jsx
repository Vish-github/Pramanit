import {useEffect, useState} from "react";
import {Formik, Form} from "formik";
import {Grid} from "@mui/material";

import InputField from "../../../UI/InputField";
import InputGroup from "./FormUI/InputGroup";
import Button from "../Forms/FormUI/ButtonWrapper";

import FORM_VALIDATION from "../../FormValidationSchemas/ApplicationRejectionSchema";

const ApplicationrejectionForm = () => {
  const [INITIAL_FORM_STATE, setInitialFormState] = useState({
    reason: "",
  });

  const onSubmit = (values) => {
    alert(values);
  };

  useEffect(() => {
    // Load Form Data from backend
    setInitialFormState({
      reason: "",
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "50px",
        borderRadius: "20px",
      }}
    >
      <Formik
        initialValues={{...INITIAL_FORM_STATE}}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={FORM_VALIDATION}
      >
        <Form>
          <Grid container spacing={2} justifyContent="center" marginTop={2}>
            <InputGroup
              full
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <InputField title="Reason" name="reason" />
            </InputGroup>
            <Button>Submit</Button>
          </Grid>
        </Form>
      </Formik>
    </div>
  );
};

export default ApplicationrejectionForm;
