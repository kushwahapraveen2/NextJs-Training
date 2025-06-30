"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header({ email }: { email: string | null }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.left}>
        <span style={styles.logo}>📘 Travel Diary</span>
        <Link href="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link href="/diary" style={styles.link}>
          Diaries
        </Link>
        <Link href="/diary/new" style={styles.link}>
          New Entry
        </Link>
      </div>
      <div style={styles.right}>
        <span style={styles.email}>{email}</span>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  email: {
    backgroundColor: "#005bb5",
    padding: "0.4rem 1rem",
    borderRadius: "10px",
  },
  logoutButton: {
    padding: "0.4rem 1rem",
    backgroundColor: "white",
    color: "#0070f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
