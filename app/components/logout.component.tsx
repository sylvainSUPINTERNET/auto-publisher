"use client";


import { logout } from "../common/tiktok/logout";


export default function Logout() {
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );

}