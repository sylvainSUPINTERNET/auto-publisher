import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q: URLSearchParams = req.nextUrl.searchParams;

  try {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache',
      },
      body: new URLSearchParams({
        client_key: process.env.OAUTH2_TIKTOK_CLIENT_ID as string,
        client_secret: process.env.OAUTH2_TIKTOK_SECRET as string,
        code: `${q.get('code')}`,
        grant_type: 'authorization_code',
        redirect_uri: process.env.OAUTH2_TIKTOK_REDIRECT_URI as string,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch tokens');
    }

    const resp = NextResponse.redirect(new URL('http://local.dev.sylvain:3000/dashboard', req.url));

    resp.cookies.set('access_token', data.access_token, {
      maxAge: data.expires_in,
      httpOnly: true,
      sameSite: 'lax', // oauth2 not possible with strict
      secure: process.env.ENV === "local" ? false : true // https only
    });
    resp.cookies.set('refresh_token', data.refresh_token, {
      maxAge: data.refresh_expires_in,
      httpOnly: true,
      sameSite: 'lax', // oauth2 not possible with strict
      secure: process.env.ENV === "local" ? false : true // https only
    });

    return resp;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'An error occurred, please try again' }, { status: 500 });
  }
}
