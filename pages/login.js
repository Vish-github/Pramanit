import Link from "next/link";

import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import userlogin from "../assets/PRAMANIT/loginuser.png";

import UserLoginForm from "../src/components/Forms/LoginForm";
import { signIn, signOut, useSession } from "next-auth/react";
// import BtnLogin from "../src/components/BtnLogin";
import React, { useEffect } from "react";
function UserLogin({ getProviders, session }) {
  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>
          <UserLoginForm />
        </div>
        <div>
          <button onClick={() => signIn("google",{callbackUrl:"http://localhost:3000/userdashboard"})}>Sign in with google</button>
          {/* <BtnLogin provider={Providers.Google} /> */}
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

// Login.getInitialProps = async (context) => {
//   return {
//     providers: await providers(context),
//     session: await getSession(context),
//   };
// };

export default UserLogin;
