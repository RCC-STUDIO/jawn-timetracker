import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

/*
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
//import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
  providers: [
    Providers.Google ({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
*/