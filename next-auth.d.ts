import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role } from "@/model/Role";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            first_name: string,
            last_name: string,
            email: string,
            role: Role,
            accessToken: string,
            refreshToken: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        role: Role,
        accessToken: string,
        refreshToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        first_name: string,
        last_name: string,
        email: string,
        role: Role,
        accessToken: string,
        refreshToken: string
    }
}