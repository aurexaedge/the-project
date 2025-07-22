import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '@/utils/db';
import userModel from '@/models/user';
import bcryptjs from 'bcryptjs';

export const authOptions = {
  secret: `${process.env.NEXTAUTH_SECRET}`,
  session: {
    strategy: 'jwt',
  },   
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user?._id) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.phoneNumber = user.phoneNumber;
      }
      if (trigger === 'update' && session) {
        token.username = session.username;
        token.phoneNumber = session.phoneNumber;
      }

      if (user?.superUser) token.superUser = user.superUser;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.phoneNumber = token.phoneNumber;
      }
      if (token?.superUser) session.user.superUser = token.superUser;

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();

        const user = await userModel.findOne({
          $or: [
            { email: credentials?.email.toLowerCase() }, // Search by email
            { username: credentials?.email.toLowerCase() }, // Search by username
          ],
        });

        if (!user) {
          throw new Error('Invalid email or password!');
        }

        const comparePassword = await bcryptjs.compare(
          credentials.password,
          user.password
        );

        if (!comparePassword) {
          throw new Error('Invalid email or password');
        }

        if (user && comparePassword) {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
            superUser: user.superUser,
            phoneNumber: user.phoneNumber,
          };
        }

        // throw new Error('Invalid email or password');
        // return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
