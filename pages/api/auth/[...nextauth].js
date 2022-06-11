import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from './../../../models/User.schema';
// import connectDB from "../../middleware/mongodb";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
require("dotenv").config;

mongoose.connect(
  process.env.MONGO_URI,
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
  }
);
export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/register",
  },

  // SQL or MongoDB database (or leave empty)
  database: process.env.MONGO_URI,
  secret: process.env.JWTPRIVATEKEY,

  callbacks: {
    async jwt({ token, account }) {
      console.log("account is ",account)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("session is ",session)
      console.log("user is ",session.user)
      console.log("token is ",token.accessToken)
      console.log("--------------------------------")
      session.accessToken = token.accessToken;
      const {name,eemail}=session.user
      let username=name
      console.log(name)
      let email=session.user.email
      console.log(email)
      const password='GoogleAuth'
      let birthTransactionId=' '
      let deathIpfsHash=' '
      let deathTransactionId=' '
      let birthIpfsHash=' '
      let accessToken = token.accessToken;
      let resetToken=' '

      User.findOne({email:email},(err,user)=>{
        console.log("email is ",email)
        if(err){
          console.log(err);
        }
        if(!user){
          const newUser = new User({
            username,
            password,
            email,
            birthIpfsHash,
            birthTransactionId,
            deathIpfsHash,
            deathTransactionId,
            accessToken,
            resetToken,
          });
          newUser
            .save()
            .then((result) => {
              console.log("user created successfully");
              return session.user;
            })
            .catch((err) => {
              console.log("user not created successfully");
              return err;
            });
          }else if (user) {
        console.log("User Already exists",user);
          }
      })
      return Promise.resolve(session)
    },
  },


  // callbacks: {
  //   session: async (session, user) => {
  //     console.log("------------------------------------------------")
  //     console.log("session is",session);
  //     console.log("user is ",user);
  //     session.userId = user;
  //     return Promise.resolve(session);
  //   },
  // },
});
