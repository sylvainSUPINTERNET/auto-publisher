'use server';

import { cookies } from "next/headers";
import Logout from "../components/logout.component";
import { getTokens } from "../common/tiktok/tokenUtils";

export default async function Dashboard() {
  
  const cookieStore = await cookies();
  const {access_token: accessToken} = await getTokens(cookieStore);


  // SAMPLE : https://ext.cdn.opus.pro/media/org_1icol7k18TqKBP0s05643/google-oauth2|108177442051367825643/P1111521uhe2/c.ee5d5877e2/esd.mp4?v=1731708280628851
  // https://developers.tiktok.com/doc/content-posting-api-get-started?enter_method=left_navigation

  
  const userInfosResponse = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count,likes_count,video_count,is_verified,following_count", 
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  const {data} = await userInfosResponse.json();


  return (
    <div>

      {JSON.stringify(data.user)}
      <h1 className="text-bold text-4xl">
        Dashboard
      </h1>
      <Logout></Logout>
    </div>
  );

}