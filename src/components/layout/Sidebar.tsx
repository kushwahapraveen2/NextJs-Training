"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/users", label: "Users", icon: "👥" },
    { href: "/diary", label: "Diary", icon: "📚" },
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/imagegallery", label: "Image Gallery", icon: "🖼️" },
    { href: "/ssg", label: "SSG Demo", icon: "📄" },
    { href: "/ssr", label: "SSR Demo", icon: "⚡" },
    { href: "/isr", label: "ISR Demo", icon: "🔄" },
    { href: "/interceptingroutes", label: "Intercepting Routes", icon: "🔄" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h3 style={styles.sidebarTitle}>Navigation</h3>
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              ...styles.navItem,
              ...(isActive(item.href) && styles.activeNavItem),
            }}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span style={styles.navLabel}>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  sidebar: {
    width: "280px",
    backgroundColor: "white",
    borderRight: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 70px)",
    position: "sticky",
    top: "70px",
  },
  sidebarHeader: {
    padding: "1.5rem",
    borderBottom: "1px solid #e5e7eb",
  },
  sidebarTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  nav: {
    flex: 1,
    padding: "1rem 0",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.75rem 1.5rem",
    textDecoration: "none",
    color: "#6b7280",
    transition: "all 0.3s ease",
    fontSize: "1rem",
  },
  activeNavItem: {
    backgroundColor: "#f3f4f6",
    color: "#3b82f6",
    borderRight: "3px solid #3b82f6",
  },
  navIcon: {
    fontSize: "1.2rem",
    width: "20px",
    textAlign: "center",
  },
  navLabel: {
    fontWeight: "500",
  },
  sidebarFooter: {
    padding: "1.5rem",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  footerInfo: {
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: "0 0 0.25rem 0",
  },
  footerVersion: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    margin: 0,
  },
};
