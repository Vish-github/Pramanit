import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import registeruser from "../assets/PRAMANIT/registeruser.png";

import Button from "../UI/Button";
import UserRegistrationForm from "../src/components/Forms/UserRegistrationForm";

function UserRegister() {
  return (
    <FormBackground pagetitle="User Registeration" image={registeruser}>
      <div>
        {" "}
        <div>
          <UserRegistrationForm />
        </div>
        {/* <div>
          <Button title="Register" />
        </div> */}
        <div className={styles.bottomText}>
          <p className={styles.message}>
            Already have an account?{" "}
            <span className={styles.boldtext}>Login</span>
          </p>
        </div>
      </div>
    </FormBackground>
  );
}

export default UserRegister;
