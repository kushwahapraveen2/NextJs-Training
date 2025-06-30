"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "../../lib/auth-utils";
import { User } from "../../types";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>🔒</div>

          <h1 style={styles.title}>Authentication Required</h1>

          <p style={styles.message}>
            You need to be logged in to access this page. Please sign in to
            continue.
          </p>

          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>📝</span>
              <span style={styles.featureText}>
                Create personal diary entries
              </span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🖼️</span>
              <span style={styles.featureText}>Upload and manage photos</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🌤️</span>
              <span style={styles.featureText}>Track weather conditions</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>💾</span>
              <span style={styles.featureText}>Secure data storage</span>
            </div>
          </div>

          <div style={styles.actions}>
            <button
              onClick={() => router.push("/login")}
              style={styles.primaryButton}
            >
              🔑 Sign In
            </button>

            <button
              onClick={() => router.push("/signup")}
              style={styles.secondaryButton}
            >
              ✨ Create Account
            </button>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Don't have an account?
              <button
                onClick={() => router.push("/signup")}
                style={styles.linkButton}
              >
                Sign up for free
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f8fafc",
  },
  errorCard: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
    border: "1px solid #e5e7eb",
  },
  errorIcon: {
    fontSize: "4rem",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.1rem",
    color: "#6b7280",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "1rem",
    color: "#374151",
  },
  featureIcon: {
    fontSize: "1.2rem",
    width: "24px",
  },
  featureText: {
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  primaryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  footer: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "1.5rem",
  },
  footerText: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: 0,
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "0.25rem",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },
  loadingText: {
    fontSize: "1rem",
    color: "#6b7280",
  },
};
