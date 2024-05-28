import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { handleGoogleLogin, handleGithubLogin, refreshTokenIfNeeded } from '@/src/utils/jwtAuthHandler';
import {
  JWT_SECRET,
  JWT_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from '@/src/env';

const authOptions = {
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: JWT_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: JWT_NAME,
      options: { httpOnly: false, sameSite: 'lax', path: '/', secure: true },
    },
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        let tokens = null;
        if (account.provider === 'google') {
          tokens = await handleGoogleLogin(account);
        } else if (account.provider === 'github') {
          tokens = await handleGithubLogin(account);
        }

        if (tokens) {
          return {
            ...token,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          };
        }
        return null;
      }
      return refreshTokenIfNeeded(token);
    },
    async session({ session, token }) {
      session.user = {
        idToken: token.idToken,
        name: session.user.name,
        email: session.user.email,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
