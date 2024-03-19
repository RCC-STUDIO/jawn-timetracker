import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({

  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = { id: 1, name: "User", email: "user@example.com" }; 
        if (user.email === credentials.email && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', 
  },
  session: {
    jwt: true,
  },
});
