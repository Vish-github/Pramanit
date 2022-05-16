import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
      console.log("user is ",user)
      session.accessToken = token.accessToken;
      return session;
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
