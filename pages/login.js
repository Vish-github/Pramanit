import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import userlogin from "../assets/PRAMANIT/loginuser.png";
import Button from "../UI/Button";
import UserLoginForm from "../src/components/UserLoginForm/LoginForm";

function UserLogin() {
  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>
          <UserLoginForm />
        </div>
        {/* <div>
          <Button title="Login" />
        </div> */}
        <div className={styles.bottomText}>
          <p className={styles.message}>
            Do you have an account?{" "}
            <span className={styles.boldtext}>Sign Up</span>
          </p>
        </div>
      </div>
    </FormBackground>
  );
}

export default UserLogin;
