import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET( req: NextRequest ) {

    const cookieStore = await cookies()

    const csrfState = Math.random().toString(36).substring(2);
    cookieStore.set('csrfState', csrfState,
        { 
            maxAge: 60000
        }
     );

    let url = 'https://www.tiktok.com/v2/auth/authorize/';
    url += `?client_key=${process.env.OAUTH2_TIKTOK_CLIENT_ID}`;
    url += '&scope=user.info.basic,video.list,video.publish,video.upload,user.info.profile,user.info.stats';
    url += '&response_type=code';
    url += `&redirect_uri=${process.env.OAUTH2_TIKTOK_REDIRECT_URI}`;
    url += '&state=' + csrfState;

    return NextResponse.json({ url }, { status: 200 });
}
