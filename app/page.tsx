import Link from 'next/link';

export default async function Home() {
  
  let data = await fetch(`${process.env.SERVER_ACTION_URL}/api/oauth2/tiktok/authorization`, {
    method: "GET",
    cache: 'no-store'
  });
  let {url: urlAuthorization} = await data.json()

  return (
    <div>
      <Link href={urlAuthorization}>Tiktok Login</Link>
    </div>
  );

}