import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";
import User from "@/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
connectDB();
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@gmail.com", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await signInWithCredentials({ email, password });
        return user;
      },
    }),
  ],
  pages: { signIn: "/signin", error: "/errors" },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.type === "oauth") {
        return await signInWithOAuth({ account, profile });
      }
      return true;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.user.name = session.name;
        token.user.image = session.image;
      } else {
        const user = await getUserByEmail({ email: token.email });
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function signInWithOAuth({ account, profile }) {
  const user = await User.findOne({ email: profile.email });
  if (user) return true;
  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider,
  });
  await newUser.save();
  return true;
}

async function getUserByEmail({ email }) {
  const user = await User.findOne({ email }).select("-password");
  if (!user) throw new Error("Email does not exist");

  return { ...user._doc, _id: user._id.toString() };
}

async function signInWithCredentials({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist!");
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new Error("Password does not Match");

  return { ...user._doc, _id: user._id.toString() };
}
