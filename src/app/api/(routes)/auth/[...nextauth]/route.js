import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorize } from "@/app/api/_services/userService";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials: {
                email: {label: "Email", type:"text"},
                password: {label: "Password", type:"password"}
            },
            async authorize(credentials,req){
                authorize(credentials.email,credentials.password);
            }
        })
    ],
    callbacks: {
        jwt({token, user, trigger, session}){
            if(trigger === "update") {
                token.user = session.user
                return token
            }
            if(user) token.user = user;
            return token
        },
        session({session, token}){
            session.user = token.user;
            return session
        }
    },
    pages:{
        signIn: '/login'
    }

})

export {handler as GET, handler as POST}