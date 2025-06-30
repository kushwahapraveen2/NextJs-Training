"use client";

import { useRouter } from "next/navigation";

export default function UserModal() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "20%",
        background: "#fff",
        padding: 20,
        border: "1px solid black",
        zIndex: 1000,
      }}
    >
      <h2>User Modal intercept</h2>
      <button onClick={() => router.back()}>Close</button>
    </div>
  );
}
