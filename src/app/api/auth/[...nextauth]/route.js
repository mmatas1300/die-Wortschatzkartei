import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials: {
                email: {label: "Email", type:"text"},
                password: {label: "Password", type:"password"}
            },
            authorize(credentials,req){
                const user = {email: "mario", password: 'KK'}
                return user;
            }
        })
    ]

})

export {handler as GET, handler as POST}