'use client';
import axios from 'axios';

export default function Home() {

  async function handleTiktokLogin(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    
    try {
      const response = await axios.get('http://localhost:3000/api/tiktok-oauth');
    } catch ( error ) {
      console.log(error);
      alert("error");
    }

  }

  return (
    <div>
      <button onClick={handleTiktokLogin}>TikTok login</button>
    </div>
  );
}
