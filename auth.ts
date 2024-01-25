import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";

import {db} from "@/lib/db";
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  events:{
    async linkAccount({user}){
      await db.user.update({
        where:{
          id: user.id,
        },
        data:{emailVerified: new Date()},
      });
    },
  },
  callbacks:{
    async signIn({user, account}){
      //Allow Oauth without email verification
      if(account?.provider!=="credentials") return true;

      //@ts-ignore
      const existingUser = await getUserById(user.id);

      // Prevent sign-in without email verification
      if(!existingUser?.emailVerified) return false;

      //Todo: Add 2FA check

      return true;
    },
    async jwt({token}){
      if(!token.sub) return token; 
      
      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    //@ts-ignore 
    async session({token, session}){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }

      if(token.role && session.user){
        session.user.role = token.role; 
      }

      return session
    }
  },
  adapter: PrismaAdapter(db), 
  session:{strategy:"jwt"},
  pages:{
    signIn: "/auth/login",
    error: "/auth/error",
  },
  ...authConfig,
});  