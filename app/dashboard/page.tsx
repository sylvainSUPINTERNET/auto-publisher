'use server';

import { cookies } from "next/headers";
import Logout from "../components/logout.component";
import { getTokens } from "../common/tiktok/tokenUtils";

export default async function Dashboard() {
  
  const cookieStore = await cookies();
  const {access_token: accessToken} = await getTokens(cookieStore);

  

  const userInfosResponse = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,follower_count,likes_count,video_count,is_verified,following_count", 
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );
  const userInfos = await userInfosResponse.json();


  return (
    <div>

      {JSON.stringify(userInfos)}
      <div>
        Dashboard
      </div>
      <Logout></Logout>
    </div>
  );

}