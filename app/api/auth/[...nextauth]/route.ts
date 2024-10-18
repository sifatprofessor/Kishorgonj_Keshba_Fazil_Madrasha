/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as NextAuthUser } from "next-auth";
import user from "@/models/User";
import connect from "@/utils/db";

// Credentials Type
interface Credentials {
    email: string;
    password: string;
}

// Extending the Session interface to include custom fields
declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            role?: string | null;
        };
    }
}

// Defining NextAuth options
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { email, password } = credentials;

                try {
                    // Connect to the database
                    await connect();

                    // Find the user by email
                    const currentUser = await user.findOne({ email });

                    if (!currentUser) {
                        throw new Error("No user found with that email");
                    }

                    // Validate password using bcrypt
                    const isValidPassword = (password === currentUser.password);

                    if (!isValidPassword) {
                        throw new Error("Invalid password");
                    }

                    // Return user object if authentication succeeds
                    return {
                        id: currentUser._id,
                        name: currentUser.name,
                        email: currentUser.email,
                        role: currentUser.role,
                    } as NextAuthUser;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            return Boolean(user);
        },
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                await connect();
                const dbUser = await user.findOne({ email: token.email });

                if (dbUser) {
                    session.user = {
                        name: token.name,
                        email: token.email,
                        role: dbUser.role,
                    };
                }
            }
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

// Export the handler for both GET and POST methods
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
