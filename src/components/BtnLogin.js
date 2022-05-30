import React from "react";
import { signIn } from "next-auth/react";

const BtnLogin = ({ provider}) => {
  return (
    <div>
      <button 
        onClick={() => signIn(provider.id)}
      >
        Sign in with {provider.name}
      </button>
    </div>
  );
};

export default BtnLogin;
