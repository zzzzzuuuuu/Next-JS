import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        const email = String(credentials?.email ?? '');
        const password = String(credentials?.password ?? '');

        if (email === process.env.AUTH_EMAIL && password === process.env.AUTH_PASSWORD) {
          return { id: '1', name: 'Admin', email };
        }

        return null;
      }
    })
  ]
});
