import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend the Session type to include id
interface CustomSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token }) {
      // Add user information to the session
      const customSession = session as CustomSession;
      if (customSession.user && token.sub) {
        customSession.user.id = token.sub;
      }
      return customSession;
    },
    async jwt({ token, user }) {
      // Add user ID to the token when first created
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
