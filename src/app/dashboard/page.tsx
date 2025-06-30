"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Button from "../../components/ui/Button";
import { getCurrentUser } from "../../lib/auth-utils";
import { User } from "../../types";
import Link from "next/link";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
        </div>
      </Layout>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.welcomeSection}>
              <h1 style={styles.title}>
                Welcome back, {user?.name || "Traveler"}!
              </h1>
              <p style={styles.subtitle}>
                Ready to document your next adventure?
              </p>
            </div>
            <div style={styles.quickActions}>
              <Button
                onClick={() => router.push("/diary/new")}
                variant="primary"
                size="lg"
              >
                ✏️ New Diary Entry
              </Button>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>📚</div>
              <div style={styles.statContent}>
                <h3 style={styles.statNumber}>12</h3>
                <p style={styles.statLabel}>Total Entries</p>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>❤️</div>
              <div style={styles.statContent}>
                <h3 style={styles.statNumber}>89</h3>
                <p style={styles.statLabel}>Likes Received</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statIcon}></div>
              <div style={styles.statContent}>
                <h3 style={styles.statNumber}></h3>
                <p style={styles.statLabel}>
                  <Link href={"/dashboard/settings"}>Intercepted Routes</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  welcomeSection: {
    flex: 1,
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#6b7280",
  },
  quickActions: {
    display: "flex",
    gap: "1rem",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  statCard: {
    background: "white",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  statIcon: {
    fontSize: "2rem",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    color: "white",
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    margin: "0 0 0.25rem 0",
  },
  statLabel: {
    color: "#6b7280",
    fontSize: "0.9rem",
    margin: 0,
  },
  sectionsGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "2rem",
  },
  section: {
    background: "white",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  entriesList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  entryCard: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
  },
  entryImage: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
  entryEmoji: {
    fontSize: "1.5rem",
  },
  entryContent: {
    flex: 1,
  },
  entryTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 0.25rem 0",
  },
  entryDate: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    margin: "0 0 0.5rem 0",
  },
  entryPreview: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.4",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  },
  actionButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1.5rem",
    background: "#f8fafc",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  actionIcon: {
    fontSize: "1.5rem",
  },
  actionText: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#374151",
    textAlign: "center",
  },
};
