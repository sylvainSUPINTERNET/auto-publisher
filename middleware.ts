import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { tokensValid } from "./app/common/tiktok/tokenUtils";

const protectedRoutes = new Set(['/dashboard']);



export async function middleware(request: NextRequest) {
    const response: NextResponse = NextResponse.next();
    const cookieStore = await cookies();


    if (protectedRoutes.has(request.nextUrl.pathname)) {
        if ( !tokensValid(cookieStore) ) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    return response;
}




 
// export const config = {
//     matcher: '/',
// }