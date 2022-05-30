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
    jwt: true,
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
      session.accessToken = token.accessToken;
      const {name,eemail}=session.user
      let username=name
      let email=eemail
      const password='GoogleAuth'
      let birthTransactionId=' '
      let deathIpfsHash=' '
      let deathTransactionId=' '
      let birthIpfsHash=' '
      let accessToken=' '
      let resetToken=' ' 
      const newUser = new User({
        username,
        password,
        email,
        birthIpfsHash,
        birthTransactionId,
        deathIpfsHash,
        deathTransactionId,
        accessToken,
        resetToken
      });
      newUser.save()
      .then(result=>{
        return session.user;
        console.log("user created successfully");
      })
      .catch(err=>{
        console.log("user not created successfully");
        return err
      })
    },
  },
  // callbacks: {
  //   session: async (session, user) => {
  //     console.log(session,user.profile)
  //     session.userId = user.name;
  //     return Promise.resolve(session);
  //   },
  // },
});
