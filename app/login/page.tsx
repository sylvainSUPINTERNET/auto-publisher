import Link from 'next/link';
import Image from 'next/image';

export default async function Login() {
  
  let data = await fetch(`${process.env.SERVER_ACTION_URL}/api/oauth2/tiktok/authorization`, {
    method: "GET",
    cache: 'no-store'
  });
  let {url: urlAuthorization} = await data.json()

  

  return (
    <div>
      <div className="flex">
      <Link 
          href={urlAuthorization} 
          className="
            flex items-center justify-center bg-gradient-to-r from-purple-600 to-red-500
            text-white font-bold leading-tight px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out 
            hover:shadow-xl
            text-sm sm:text-base md:text-lg lg:text-xl
          ">
          <span className="mr-2 sm:mr-3">Se connecter avec TikTok</span>
          <Image 
            src="/tiktok_logo.png" 
            width={36} // Petite taille d'image pour mobile
            height={36} 
            alt="TikTok Logo" 
            className="ml-2 sm:ml-3 md:w-10 md:h-10 lg:w-12 lg:h-12"
          />
        </Link>
  
      </div>


    </div>
  );

}