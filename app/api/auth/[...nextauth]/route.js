import user from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        console.log(credentials);
        try {
          await connect();
          const CurrentUser = await user.findOne({ email });
          console.log(CurrentUser?.password)
          console.log(password)

          if (!CurrentUser) {
            return null;
          }
          console.log(CurrentUser);
          console.log(CurrentUser.name, CurrentUser.password);


          // console.log(passwordsMatch);
          if (CurrentUser && (password === CurrentUser.password)) {
            console.log("hit")
            return CurrentUser;
          }

          return null;

          
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "credentials") {
        return user;
      }
    },
    async jwt({ token, Name }) {
      return token;
    },
    async session({ session, token }) {
      await connect();
      const dbUser = await user.findOne({ email: token.email });
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = dbUser.role;
      // console.log('session', session)
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
