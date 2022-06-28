import FormBackground from "../layout/FormBackground";

import thirdpartylogin from "../assets/PRAMANIT/loginthirdparty.png";

import {useRouter} from "next/router";
import UserLoginForm from "../src/components/Forms/LoginForm";

import {connect} from "react-redux";
import {addThirdpartyToken} from "../redux/actions/thirdpartyCompany.action";
import axios from "axios";

function ThirdPartyLogin({addThirdpartyDetails}) {
  const router = useRouter();

  const login = (values) => {
    axios
      .post(`/api/thirdpartylogin`, values)
      .then((res) => {
        addThirdpartyDetails(res.data.user);
        // localStorage.setItem("pramanit", JSON.stringify(res.data.user));
        router.push("/thirdpartydashboard");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <FormBackground pagetitle="Third Party Login" image={thirdpartylogin}>
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
    addThirdpartyDetails: (param) => dispatch(addThirdpartyToken(param)),
    reset: () => dispatch(reset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThirdPartyLogin);
