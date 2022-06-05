import {useState} from "react";

import {Grid} from "@mui/material";

import Button from "../../../UI/Button";

const ApplicationrejectionForm = () => {
  const [reason, setReason] = useState("");

  const onSubmit = () => {
    if (reason.length == 0) {
      alert("Pls enter reason");
    } else {
      alert(reason);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "50px",
        borderRadius: "20px",
      }}
    >
      <Grid container spacing={2} justifyContent="center" marginTop={2}>
        <textarea
          name="reason"
          id=""
          cols="30"
          rows="10"
          placeholder="Enter yor reason"
          required
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
        <Button title={"Reject"} onClick={onSubmit} />
      </Grid>
    </div>
  );
};

export default ApplicationrejectionForm;
