import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Grid } from "@mui/material";

import InputField from "../../../UI/InputField";

const ViewMunicipalityCredentials = () => {
  const [INITIAL_FORM_STATE, setInitialFormState] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Load Form Data from backend
    setInitialFormState({
      username: "Pondamunicipality",
      password: "password123",
    });
  });

  return (
    <Formik initialValues={{ ...INITIAL_FORM_STATE }} enableReinitialize>
      <Form>
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          <InputField title="Username" name="username" disabled />
          <InputField
            title="Password"
            name="password"
            // type="password"
            disabled
          />
        </Grid>
      </Form>
    </Formik>
  );
};

export default ViewMunicipalityCredentials;
