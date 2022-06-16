import {useState} from "react";

import {useRouter} from "next/router";

import {Grid} from "@mui/material";

import Button from "../../../UI/Button";
import axios from "axios";

const ApplicationrejectionForm = ({email, id, onClose}) => {
  const [reason, setReason] = useState("");
  const router = useRouter();

  const onSubmit = () => {
    if (reason.length == 0) {
      alert("Pls enter reason");
    } else {
      axios
        .post("/api/mailer", {
          email: email,
          reason,
          id,
        })
        .then((res) => {
          console.log("Res", res);
          onClose();
          router.push("/municipality_dashboard");
        })
        .catch((err) => {
          console.log("Error", err);
        });
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
