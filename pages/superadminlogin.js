import FormBackground from "../layout/FormBackground";

import loginsuperadmin from "../assets/PRAMANIT/loginsuperadmin.png";

import {useRouter} from "next/router";
import UserLoginForm from "../src/components/Forms/LoginForm";

import {connect} from "react-redux";
import {addSuperadminToken} from "../redux/actions/superadmin.action";
import axios from "axios";

function SuperAdminLogin({addSuperadminDetails}) {
  const router = useRouter();

  const login = (values) => {
    axios
      .post(`/api/superadminlogin`, values)
      .then((res) => {
        addSuperadminDetails(res.data.user);
        router.push("/super_admin_panel");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <FormBackground pagetitle="Super Admin Login" image={loginsuperadmin}>
      <div>
        {" "}
        <div>
          <UserLoginForm onsubmit={login} />
        </div>
      </div>
    </FormBackground>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    addSuperadminDetails: (param) => dispatch(addSuperadminToken(param)),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminLogin);
