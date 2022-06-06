import {useEffect, useState} from "react";

import Axios from "axios";
import moment from "moment";

import Header from "../../layout/Header";

import styles from "../../styles/UserDashboard.module.css";

import ViewCertificateForm from "../../src/components/Forms/ViewCertificateForm";
import {Avatar} from "@mui/material";

import {useRouter} from "next/router";

function ViewCertificate() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [INITIAL_FORM_STATE, setINITIAL_FORM_STATE] = useState({
    childFirstName: "",
    childLastName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "2022-04-15",
    placeOfBirth: "",
    address: "",
    fatherNationality: "",
    motherNationality: "",
    gender: "male",
    grandFatherName: "",
    grandMotherName: "",
    muncipalityLocation: "",
    fatherIdentityProof: null,
    motherIdentityProof: null,
    addressProof: null,
    birthProof: null,
    dateApplied: "",
    applierEmail: "",
  });

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query.id);
      const url = `/api/Indivisual_certificate/applicant_id?id=${router.query.id}`;
      const fetchData = async () => {
        try {
          const response = await Axios.get(url);
          const data = response.data.allData.data;
          const email = response.data.allData.email;

          const details = {
            childFirstName: data.childFirstName,
            childLastName: data.childLastName,
            fatherName: data.fatherName,
            motherName: data.motherName,
            dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
            placeOfBirth: data.placeOfBirth,
            address: data.address,
            fatherNationality: data.fatherNationality,
            motherNationality: data.motherNationality,
            gender: data.gender,
            grandFatherName: data.grandFatherName,
            grandMotherName: data.grandMotherName,
            muncipalityLocation: data.muncipalityLocation,
            fatherIdentityProof: data.fatherIdentityProof.replace(
              ".pdf",
              ".jpg"
            ),
            motherIdentityProof: data.motherIdentityProof.replace(
              ".pdf",
              ".jpg"
            ),
            addressProof: data.addressProof.replace(".pdf", ".jpg"),
            birthProof: data.birthProof.replace(".pdf", ".jpg"),
            dateApplied: moment(data.createdAt).format("YYYY-MM-DD"),
            applierEmail: email,
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
              {INITIAL_FORM_STATE.childFirstName[0]}
            </Avatar>
            <h2 className={styles.user_name}>
              {INITIAL_FORM_STATE.childFirstName +
                "  " +
                INITIAL_FORM_STATE.childLastName}
            </h2>
          </div>
        </div>
      </Header>
      {query && (
        <ViewCertificateForm
          query={query}
          INITIAL_FORM_STATE={INITIAL_FORM_STATE}
        />
      )}
    </div>
  );
}

export default ViewCertificate;
