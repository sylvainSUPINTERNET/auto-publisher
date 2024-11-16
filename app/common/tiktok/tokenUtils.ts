import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const TEN_MINUTES = 10 * 60; // 10 minutes in seconds

export async function tokensValid(cookieStore:ReadonlyRequestCookies): Promise<boolean> {
    if ( !cookieStore.get('access_token') || !cookieStore.get('refresh_token') || !cookieStore.get('expires_in') || !cookieStore.get('refresh_expires_in') ) {
        console.info('tokens invalid : missing');

        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        cookieStore.delete('expires_in');
        cookieStore.delete('refresh_expires_in');

        return false;
    } else if (  tokenExpired(cookieStore) ) {
        console.info('tokens expired');

        const refreshData = await refreshToken(cookieStore);
        if ( refreshData === null ) {
            
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        cookieStore.delete('expires_in');
        cookieStore.delete('refresh_expires_in');

            return false;
        }
        
        const {access_token, expires_in, refresh_token, refresh_expires_in} = refreshData;

        cookieStore.set('access_token', access_token, {
            maxAge: expires_in,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.ENV === "local" ? false : true
        });

        cookieStore.set('refresh_token', refresh_token, {
            maxAge: refresh_expires_in,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.ENV === "local" ? false : true
        });
        cookieStore.set('expires_in', (Date.now() + (expires_in*1000)) as any, {
            maxAge: expires_in,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.ENV === "local" ? false : true
        });

        cookieStore.set('refresh_expires_in', (Date.now() + (refresh_expires_in*1000)) as any, {
            maxAge: refresh_expires_in,
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.ENV === "local" ? false : true
        });
        console.info("tokens refreshed with success");

        return true;
    } else {
        return true;
    }
}

// 86400 => 24h
export function tokenExpired(cookieStore:ReadonlyRequestCookies) {
    return (
        (Date.now() > parseInt(cookieStore.get('expires_in')?.value as string) - TEN_MINUTES) ||
        (Date.now() > parseInt(cookieStore.get('refresh_expires_in')?.value as string) - TEN_MINUTES)
    );
} 


export async function refreshToken(cookieStore:ReadonlyRequestCookies) {
    try {
        const tokenRefresh = cookieStore.get('refresh_token')?.value as string;
        const resp = await fetch(`https://open.tiktokapis.com/v2/oauth/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: new URLSearchParams({
                client_key: process.env.OAUTH2_TIKTOK_CLIENT_ID as string,
                client_secret: process.env.OAUTH2_TIKTOK_SECRET as string,
                grant_type: 'refresh_token',
                refresh_token: tokenRefresh,
            })
        });

        const data = await resp.json();
        return data;
    } catch ( e ) {
        console.error(e);
        return null;
    }


//     curl --location --request POST 'https://open.tiktokapis.com/v2/oauth/token/' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --header 'Cache-Control: no-cache' \
// --data-urlencode 'client_key=CLIENT_KEY' \
// --data-urlencode 'client_secret=CLIENT_SECRET' \
// --data-urlencode 'grant_type=refresh_token' \
// --data-urlencode 'refresh_token=REFRESH_TOKEN'

// {
//     "access_token": "act.example12345Example12345Example",
//     "expires_in": 86400,
//     "open_id": "asdf-12345c-1a2s3d-ac98-asdf123as12as34",
//     "refresh_expires_in": 31536000,
//     "refresh_token": "rft.example12345Example12345Example",
//     "scope": "user.info.basic,video.list",
//     "token_type": "Bearer"
// }
}