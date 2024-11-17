// "use client";

// import useSWR from 'swr';

export default async function DirectUpload({ accessToken }: { accessToken: string }) {

    const data = await fetch("https://open.tiktokapis.com/v2/post/publish/creator_info/query/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${accessToken}`,
        }
    });
    const json = await data.json();

    return ( 
        <div>
            DIRRECTU PLOAD {JSON.stringify(json)}
        </div>
    )

//   const queryCreatorInfoFetcher = async (url: string) => {
//     const options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8",
//         "Authorization": `Bearer ${accessToken}`,
//       },
//       body: ''  // Ajouter le corps vide pour correspondre au `curl`
//     };

//     try {
//       const response = await fetch(url, options);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     } catch (error) {
//       console.error("Erreur lors de la requête fetch:", error);
//       return null;
//     }
//   };

//   const { data, isValidating } = useSWR<any>(
//     "https://open.tiktokapis.com/v2/post/publish/creator_info/query/",
//     queryCreatorInfoFetcher,
//     {
//       revalidateOnFocus: false,        // Pas de revalidation au focus
//       revalidateOnReconnect: false,    // Pas de revalidation à la reconnexion
//       refreshInterval: 0,              // Pas de rafraîchissement périodique
//       revalidateIfStale: false,        // Pas de revalidation si les données sont obsolètes
//     }
//   );

//   return (
//     <div>
//       Direct upload : {isValidating ? "Chargement..." : JSON.stringify(data)}
//     </div>
//   );
}
