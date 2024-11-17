import useSWR from 'swr';

// const fetcher = (url:string) => fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json());

const queryCreatorInfoFetcher = async (url:string, accessToken:string) => fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({}) }).then(res => res.json());

export default async function DirectUpload({accessToken}: {accessToken:string}) {

    // const { data, error, mutate } = useSWR('/api/data', fetcher);
    const { data, error, mutate} = useSWR<any>(
        [   
            `https://open.tiktokapis.com/v2/post/publish/creator_info/query/`,
            accessToken
        ],
        queryCreatorInfoFetcher,
        {
            revalidateOnFocus: false
        }
    )
    return ( 
        <div>
            Direct upload : {JSON.stringify(data)}
        </div>
    )
}