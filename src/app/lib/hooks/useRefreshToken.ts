"use client"

import { useSession } from "next-auth/react"
import axios from "../axios";
import { signOut } from "next-auth/react";

export const useRefreshToken = () => {
    const { data: session } = useSession();

    const refreshToken = async () => {
        await axios.post("/auth/refresh", {
            refreshToken: session?.user.refreshToken
        })
        .then(res => {
            if(session) session.user.accessToken = res.data.accessToken;
        })
        .catch(err => {
            if(err.response.status === 401){
                signOut();
            }
        })
    }

    return refreshToken;
}