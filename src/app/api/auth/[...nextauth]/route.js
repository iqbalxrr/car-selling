import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await dbConnect();
        const db = client.db("car-selling"); 
        const collection = db.collection("users"); 

        // MongoDB থেকে ইউজার খুঁজে বের করা
        const user = await collection.findOne({ email: credentials.email });
        if (!user) return null;

        // plain password check (bcrypt না ব্যবহার)
        if (user.password !== credentials.password) return null;

        // সফল হলে user object return করতে হবে
        return { id: user._id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
