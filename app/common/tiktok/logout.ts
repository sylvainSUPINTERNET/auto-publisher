'use server';

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


export async function logout(ev:any) {
    const cookieStore = await cookies();

    try {

        const resp = await fetch('https://open.tiktokapis.com/v2/oauth/revoke/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: new URLSearchParams({
                'client_key': process.env.OAUTH2_TIKTOK_CLIENT_ID as string,
                'client_secret': process.env.OAUTH2_TIKTOK_SECRET as string,
                'token': cookieStore.get('access_token')?.value as string,
            })
        });

        const revokeToken  = await resp.json();
        // TODO ?
        // {
        //     "error": "invalid_request",
        //     "error_description": "The request parameters are malformed.",
        //     "log_id": "202206221854370101130062072500FFA2"
        // }
        
        // curl --location --request POST 'https://open.tiktokapis.com/v2/oauth/revoke/' \
        //     --header 'Content-Type: application/x-www-form-urlencoded' \
        //     --header 'Cache-Control: no-cache' \
        //     --data-urlencode 'client_key=CLIENT_KEY' \
        //     --data-urlencode 'client_secret=CLIENT_SECRET' \
        //     --data-urlencode 'token=ACCESS_TOKEN'
    } catch ( e ) {
        console.error(e);
    } finally {
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');
        cookieStore.delete('expires_in');
        cookieStore.delete('refresh_expires_in');
        redirect('/login');
    }
}
