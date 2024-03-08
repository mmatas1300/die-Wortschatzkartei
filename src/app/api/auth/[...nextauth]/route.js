import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from '@/models/user'
import bcrypt from 'bcryptjs'

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
                const userFound = await User.findOne({email: credentials.email},{ email: 1, password: 1, config: 1,_id:1});


                if(!userFound) throw new Error("Ungültige Daten")

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)

                if(!passwordMatch)throw new Error("Ungültige Daten")

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
            session.user = token.user; //pasar el token a la session
            return session
        }
    },
    pages:{
        signIn: '/login'
    }

})

export {handler as GET, handler as POST}