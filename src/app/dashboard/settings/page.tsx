"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <>
      <h1>Dashboard Settings</h1>
      <Link href="/dashboard/settings/user">Open User Modal</Link>
    </>
  );
}
