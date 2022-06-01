import Link from "next/link";

import FormBackground from "../layout/FormBackground";

import styles from "../styles/UserLogin.module.css";

import userlogin from "../assets/PRAMANIT/loginuser.png";
import {useRouter} from "next/router";
import UserLoginForm from "../src/components/Forms/LoginForm";
import { signIn, signOut, useSession } from "next-auth/react";
// import BtnLogin from "../src/components/BtnLogin";
import React, { useEffect } from "react";
function UserLogin() {
  const session=useSession()
  const router = useRouter();

  const setToken=()=>{
    console.log('in HERE',session)
    localStorage.setItem("pramanit", JSON.stringify(session));
    // window.location('/userdashboard')
    router.push("/userdashboard");
  }
  return (
    <FormBackground pagetitle="User Login" image={userlogin}>
      <div>
        {" "}
        <div>
          <UserLoginForm />
        </div>
        <div>
          <button onClick={() => signIn("google",{callbackUrl:"http://localhost:3000/login"})}>Sign in with google</button>
          {/* <BtnLogin provider={Providers.Google} /> */}
          {session.data!=undefined?
          setToken():<></> 
        }
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

// UserLogin.getInitialProps = async (context) => {
//   return {
//     // providers: await providers(context),
//     session: await getSession(context),
//   };
// };

export default UserLogin;
