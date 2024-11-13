import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest ) {

    console.log(process.env);

    const csrfState = Math.random().toString(36).substring(2);

    const response = NextResponse.next()

    response.cookies.set('csrfState', csrfState, { maxAge: 60000 });

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${process.env.OAUTH2_TIKTOK_CLIENT_ID}`;
    url += '&scope=user.info.basic';
    url += '&response_type=code';
    url += `&redirect_uri=h${process.env.OAUTH2_TIKTOK_REDIRECT_URI}`;
    url += '&state=' + csrfState;


    return NextResponse.redirect(url);
}
