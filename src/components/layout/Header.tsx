"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getCurrentUser, clearCurrentUser } from "../../lib/auth-utils";
import { User } from "../../types";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    setUser(null);
    setIsDropdownOpen(false);
    window.location.href = "/";
  };

  const getPageTitle = () => {
    if (pathname === "/") return "Home";
    
    if (pathname?.startsWith("/users")) return "Users";
    if (pathname?.startsWith("/diary")) return "Diary";
    if (pathname?.startsWith("/dashboard")) return "Dashboard";
    if (pathname?.startsWith("/imagegallery")) return "Image Gallery";
    if (pathname?.startsWith("/ssg")) return "Static Site Generation";
    if (pathname?.startsWith("/ssr")) return "Server Side Rendering";
    if (pathname?.startsWith("/isr")) return "Incremental Static Regeneration";
    if (pathname?.startsWith("/interceptingroutes"))
      return "Intercepting Routes";
    return "Next.js Training";
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logoSection}>
          <Link href="/" style={styles.logo}>
             Next.js
          </Link>
        </div>

        <div style={styles.breadcrumb}>
          <span style={styles.breadcrumbText}>{getPageTitle()}</span>
        </div>

        <div style={styles.headerActions}>
          {user ? (
            <div style={styles.userMenu}>
              <button
                style={styles.userButton}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              >
                <div style={styles.userAvatar}>
                  <span style={styles.avatarText}>
                    {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                  </span>
                </div>
                <span style={styles.userName}>{user.name || user.email}</span>
                <span style={styles.dropdownIcon}>
                  {isDropdownOpen ? "▲" : "▼"}
                </span>
              </button>

              {isDropdownOpen && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownHeader}>
                    <span style={styles.dropdownEmail}>{user.email}</span>
                  </div>
                  <div style={styles.dropdownDivider} />
                  <Link href="/dashboard" style={styles.dropdownItem}>
                    <span style={styles.dropdownIcon}>📊</span>
                    Dashboard
                  </Link>
                  <Link href="/portfolio" style={styles.dropdownItem}>
                    <span style={styles.dropdownIcon}>💼</span>
                    Portfolio
                  </Link>
                  <Link href="/diary" style={styles.dropdownItem}>
                    <span style={styles.dropdownIcon}>📚</span>
                    My Diaries
                  </Link>
                  <button style={styles.dropdownItem} onClick={handleLogout}>
                    <span style={styles.dropdownIcon}>🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={styles.authButtons}>
              <Link href="/login" style={styles.actionButton}>
                Login
              </Link>
              <Link href="/signup" style={styles.actionButton}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    height: "70px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    padding: "0 2rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },
  logoSection: {
    flex: 1,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  breadcrumb: {
    flex: 1,
    textAlign: "center",
  },
  breadcrumbText: {
    fontSize: "1.1rem",
    color: "#6b7280",
    fontWeight: "500",
  },
  headerActions: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  authButtons: {
    display: "flex",
    gap: "1rem",
  },
  actionButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  userMenu: {
    position: "relative",
  },
  userButton: {
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    color: "#1f2937",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  userAvatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "0.5rem",
  },
  avatarText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  userName: {
    marginRight: "0.5rem",
    fontSize: "0.9rem",
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dropdownIcon: {
    fontSize: "0.8rem",
    transition: "transform 0.3s ease",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
    minWidth: "200px",
    marginTop: "0.5rem",
    overflow: "hidden",
    animation: "slideDown 0.3s ease",
  },
  dropdownHeader: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #e9ecef",
  },
  dropdownEmail: {
    color: "#6c757d",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  dropdownDivider: {
    height: "1px",
    backgroundColor: "#e9ecef",
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0.75rem 1rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#495057",
    fontSize: "0.9rem",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
  },
};
