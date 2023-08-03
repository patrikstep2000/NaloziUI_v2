import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { USER_ROLE } from "./app/lib/constants"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        if(request.nextUrl.pathname.startsWith("/admin") && request.nextauth.token?.role.name !== USER_ROLE.ADMIN){
            return NextResponse.rewrite(new URL("/denied", request.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: "/auth/signIn"
        }
    },

)