import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials: {
                email: {label: "Email", type:"text"},
                password: {label: "Password", type:"password"}
            },
            async authorize(credentials,req){
                await connectDB()

                const userFound = await User.findOne({email: credentials.email}).select("+password");

                if(!userFound) throw new Error("Ungültige Daten")

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)

                if(!passwordMatch)throw new Error("Ungültige Daten")

                return userFound;
            }
        })
    ],
    callbacks: {
        jwt({account, token, user, profile, session}){
            if(user) token.user = user;
            console.log(token)
            return token
        },
        session({session, token}){
            session.user = token.user; //pasar el token a la session
            return session
        }
    },
    pages:{
        signIn: '/login'
    }

})

export {handler as GET, handler as POST}