"use client";

import { logout } from "../common/tiktok/logout";

export default function Dashboard() {

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>
        Dashboard
      </div>
    </div>
  );

}