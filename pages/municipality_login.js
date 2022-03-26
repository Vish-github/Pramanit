import FormBackground from "../layout/FormBackground";
import loginmunicipality from "../assets/PRAMANIT/loginmunicipality.png";
import MunicipalityLoginForm from "../src/components/Forms/MunicipalityLoginForm";

function MuncipalityLogin() {
  return (
    <FormBackground pagetitle="Municipality Login" image={loginmunicipality}>
      <div>
        {" "}
        <div>
          <MunicipalityLoginForm />
        </div>
      </div>
    </FormBackground>
  );
}

export default MuncipalityLogin;
