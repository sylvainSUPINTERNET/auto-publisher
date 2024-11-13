import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    console.log("MIDDLEWARE")
    // response.cookies.set('access_token_link', 'my_token_value', {
    //     httpOnly:true,
    //     secure:true,
    //     sameSite:'strict',
    //     //maxAge -> use plaid expiration ( access_token never expired i think)
    // });

    // console.info("middleware");
    // // TODO attach cookie shiet here
    return response;
}


 
export const config = {
    matcher: '/',
}