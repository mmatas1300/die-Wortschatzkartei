import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from '@/models/user'
import bcrypt from 'bcryptjs'
import CryptoJS from "crypto-js";

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
                const userFound = await User.findOne({email: credentials.email});

                if(!userFound) throw new Error("Ungültige Daten")

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)

                if(!passwordMatch)throw new Error("Ungültige Daten")

                userFound.config.ponsSecret = CryptoJS.AES.decrypt(userFound.config.ponsSecret, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
                
                const userData={
                    email: userFound.email,
                    config: userFound.config,
                    _id: userFound._id,
                }
                return userData;
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