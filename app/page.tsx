import Link from "next/link";

export default async function Home() {

  return (
    <div>
      Landing page
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );

}