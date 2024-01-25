import NextAuth, {DefaultSession} from "next-auth"
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
    
    async jwt({token}){
      if(!token.sub) return token; 
      
      const existingUser = await getUserById(token.sub);

      if(!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
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