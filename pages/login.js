import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import userlogin from "../assets/PRAMANIT/loginuser.png";
import Button from "../UI/Button";

function UserLogin() {
  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>{/* login form here */}</div>
        <div>
          <Button title="Login" />
        </div>
        <div>
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
