import Link from "next/link";

import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import registeruser from "../assets/PRAMANIT/registeruser.png";

import UserRegistrationForm from "../src/components/Forms/UserRegistrationForm";

function UserRegister() {
  return (
    <FormBackground pagetitle="User Registeration" image={registeruser}>
      <div>
        {" "}
        <div>
          <UserRegistrationForm />
        </div>
        <div className={styles.bottomText}>
          <p className={styles.message}>
            Already have an account?{" "}
            <Link href="/login">
              <a className={styles.boldtext}>Login</a>
            </Link>
          </p>
        </div>
      </div>
    </FormBackground>
  );
}

export default UserRegister;
