import Link from "next/link";

import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import userlogin from "../assets/PRAMANIT/loginuser.png";

import UserLoginForm from "../src/components/Forms/LoginForm";

function UserLogin() {

  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>
          <UserLoginForm />
        </div>
        <div className={styles.bottomText}>
          <p className={styles.message}>
            Do you have an account?{" "}
            <Link href="/register">
              <a className={styles.boldtext}>Sign Up</a>
            </Link>
          </p>
        </div>
      </div>
    </FormBackground>
  );
}

export default UserLogin;
