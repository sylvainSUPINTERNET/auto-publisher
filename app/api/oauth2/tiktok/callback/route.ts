// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


export async function GET( req: NextRequest ) {

    const q:URLSearchParams = req.nextUrl.searchParams

    //const cookieStore = await cookies()
    //const csrfState = cookieStore.get('csrfState'); // if you are using loopback like .me domain, you will have problem to use cookie    

    try {

        const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'no-cache'
            },
            body: new URLSearchParams({
              client_key: process.env.OAUTH2_TIKTOK_CLIENT_ID as string,         
              client_secret:process.env.OAUTH2_TIKTOK_SECRET as string,  
              code: `${q.get('code')}`,                     
              grant_type: 'authorization_code',
              redirect_uri: process.env.OAUTH2_TIKTOK_REDIRECT_URI as string
            })
        });
        
        const data = await response.json();
        return NextResponse.json({ ...data }, { status: 200 });
    } catch ( e ) {
        console.error(e);
        return NextResponse.json({ "error": "error occured, please try again" }, { status: 500})
    }

}
