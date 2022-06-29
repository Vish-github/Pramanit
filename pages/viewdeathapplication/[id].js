import {useEffect, useState} from "react";

import Axios from "axios";
import moment from "moment";

import Header from "../../layout/Header";

import styles from "../../styles/UserDashboard.module.css";

import ViewDeathCertificateForm from "../../src/components/Forms/ViewDeathCertificateForm";
import {Avatar} from "@mui/material";

import {useRouter} from "next/router";

function ViewDeathApplication() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const currDate = () => {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    dateOfDeath: currDate(),
    placeOfDeath: "",
    addressAtTimeOfDeath: "",
    permanentAddress: "",
    gender: "male",
    reasonOfDeath: "",
    muncipalityLocation: "",
    proofOfDeath: null,
    addressProof: null,
    ageProof: null,
    identityproof: null,
    dateApplied: "",
    applierEmail: "",
    id: "",
    issued: 0,
  });

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query.id);
      const url = `/api/Indivisual_death_certificate/applicant_id?id=${router.query.id}`;
      const fetchData = async () => {
        try {
          const response = await Axios.get(url);
          const data = response.data.allData.data;
          const email = response.data.allData.email;

          const details = {
            firstName: data.firstName,
            lastName: data.lastName,
            fatherName: data.fatherName,
            motherName: data.motherName,
            dateOfDeath: moment(data.dateOfDeath).format("YYYY-MM-DD"),
            placeOfDeath: data.placeOfDeath,
            addressAtTimeOfDeath: data.addressAtTimeOfDeath,
            permanentAddress: data.permanentAddress,
            reasonOfDeath: data.reasonOfDeath,
            gender: data.gender,
            muncipalityLocation: data.muncipalityLocation,
            proofOfDeath: data.proofOfDeath.replace(".pdf", ".jpg"),
            addressProof: data.addressProof.replace(".pdf", ".jpg"),
            ageProof: data.ageProof.replace(".pdf", ".jpg"),
            identityproof: data.identityproof.replace(".pdf", ".jpg"),
            dateApplied: moment(data.createdAt).format("YYYY-MM-DD"),
            applierEmail: email,
            id: router.query.id,
            certiid: data._id,
            issued: data.issued,
          };

          setINITIAL_FORM_STATE(details);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    }
  }, [router.isReady]);

  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <Avatar sx={{bgcolor: "#fff", color: "#930D0D"}}>
              {INITIAL_FORM_STATE.firstName[0]}
            </Avatar>
            <h2 className={styles.user_name}>
              {INITIAL_FORM_STATE.firstName +
                "  " +
                INITIAL_FORM_STATE.lastName}
            </h2>
          </div>
        </div>
      </Header>
      {query && (
        <ViewDeathCertificateForm
          query={query}
          INITIAL_FORM_STATE={INITIAL_FORM_STATE}
        />
      )}
    </div>
  );
}

export default ViewDeathApplication;
