import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const protectedRoutes = new Set(['/dashboard']);

export async function middleware(request: NextRequest) {
    const response: NextResponse = NextResponse.next();
    const cookieStore = await cookies();


    if (protectedRoutes.has(request.nextUrl.pathname)) {
        return isLogged(cookieStore, request);
    }

    return response;
}


function isLogged(cookieStore:ReadonlyRequestCookies, request:NextRequest) {
    if ( !cookieStore.get('access_token') || !cookieStore.get('refresh_token') ) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // TODO => add verification on the token validity
}

 
// export const config = {
//     matcher: '/',
// }