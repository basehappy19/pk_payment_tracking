import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "user-login",
            name: "User Login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials as { username: string; password: string };
                const response = await fetch(process.env.NEXT_PUBLIC_APP_API + "/user_login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                const user = await response.json();                        
                if (response.ok && user) {
                    return {
                        id: user.payload.user.id,
                        role: "user",
                        roleId: user.payload.user.roleId,
                        token: user.token,
                    };
                }
                return null;
            }
        }),
        CredentialsProvider({
          id: "student-login",
          name: "Student Login",
          credentials: {
            sid: { label: "sid", type: "text" },
            cid: { label: "cid", type: "password" },
          },
          async authorize(credentials) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/student_login`, {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            });
            const student = await res.json();
    
            if (res.ok && student) {                
                return {
                    id: student.payload.student.id,
                    role: "student",
                    roleId: "0",
                    token: student.token,
                };
            }
            return null;
          },
        }),
        
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, 
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.roleId = user.roleId;
                token.accessToken = user.token;
            }
            return token;
            
        },
        async session({ session, token }) {
            if (token.role === "student") {
                session.user = { id: token.id, role: "student"};
                session.role = token.role;
                session.roleId = token.roleId;
                session.accessToken = token.accessToken;
            } else if (token.role === "user") {
                session.user = { id: token.id, role: "user"};
                session.role = token.role;
                session.roleId = token.roleId;
                session.accessToken = token.accessToken;
            }
            return session;
        }       
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth",
        signOut: "/",
    }
};