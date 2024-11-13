import Image from "next/image";

export default function Home() {

  function handleTiktokLogin(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();

    fetch("/api/tiktok-oauth/route")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <button onClick={handleTiktokLogin}>TikTok login</button>
    </div>
  );
}
