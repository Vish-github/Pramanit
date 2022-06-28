import {useState} from "react";

import Image from "next/image";
import {useRouter} from "next/router";
import {connect} from "react-redux";

import Header from "../layout/Header";
import Modal from "../layout/Modal";

import styles from "../styles/SuperAdminPanel.module.css";
import styles1 from "../styles/Modal.module.css";
import addnewmunicipality from "../assets/PRAMANIT/Addnewmunicipality.png";
import addnewthirdparty from "../assets/PRAMANIT/addnewthirdparty.png";

import ApplicationOuter from "../src/components/MunicipalityDashboard/ApplicationOuter";
import AddMunicipalityForm from "../src/components/Forms/AddMunicipalityForm";
import ViewMunicipalityCredentials from "../src/components/Forms/ViewMunicipalityCredentials";
import AddThirdPartyForm from "../src/components/Forms/AddThirdPartyForm";
import Popper from "../UI/Popper";
import {removeSuperadminToken} from "../redux/actions/superadmin.action";

function SuperAdminPanel({removeSuperAdminDetails}) {
  const [open, setOpen] = useState(false);
  const [addthirdparty, setAddthirdparty] = useState(false);
  const [addmunicipality, setAddmunicipality] = useState(false);

  const router = useRouter();

  const logout = () => {
    removeSuperAdminDetails();
    router.push("/superadminlogin");
  };

  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <p className={styles.page_title}>Super Admin</p>
          <Popper logout={logout} />
        </div>
      </Header>
      <div className={styles.add_municipality_container}>
        <div className={styles.superadminselectioncomponent}>
          <Image
            src={addnewmunicipality}
            width={300}
            height={300}
            alt="Add new municipality"
          />
          <p onClick={() => setAddmunicipality(true)}>Add new municipality</p>
        </div>
        <div className={styles.superadminselectioncomponent}>
          <Image
            src={addnewthirdparty}
            width={300}
            height={300}
            alt="Add new municipality"
          />
          <p onClick={() => setAddthirdparty(true)}>Add new third party</p>
        </div>
      </div>
      <h6 className={styles.page_title} style={{paddingLeft: "35px"}}>
        Municipality Credentials:
      </h6>

      <div className={styles.municipality_container}>
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
        <ApplicationOuter
          color="rgba(155, 196, 244, 0.27)"
          name="Ponda"
          daysDisplay={false}
          onclick={() => setOpen(true)}
        />
      </div>
      <Modal open={open} setOpen={setOpen}>
        <h6 className={styles1.modalHeading}>Ponda Municipality Credentials</h6>
        <ViewMunicipalityCredentials />
      </Modal>
      <Modal open={addmunicipality} setOpen={setAddmunicipality}>
        <AddMunicipalityForm />
      </Modal>
      <Modal open={addthirdparty} setOpen={setAddthirdparty}>
        <AddThirdPartyForm setOpen={setAddthirdparty} />
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    removeSuperAdminDetails: () => dispatch(removeSuperadminToken()),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminPanel);
