"use client"; // Must be a client component

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div style={styles.container}>
      <div style={styles.errorCard}>
        <div style={styles.errorIcon}>⚠️</div>

        <h1 style={styles.errorTitle}>Something went wrong!</h1>

        <p style={styles.errorMessage}>
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        {error.digest && (
          <div style={styles.errorDetails}>
            <p style={styles.errorDigest}>
              Error ID: <code style={styles.code}>{error.digest}</code>
            </p>
          </div>
        )}

        <div style={styles.errorActions}>
          <button onClick={reset} style={styles.retryButton}>
            🔄 Try Again
          </button>

          <Link href="/" style={styles.homeButton}>
            🏠 Go Home
          </Link>
        </div>

        <div style={styles.errorHelp}>
          <p style={styles.helpText}>
            If this problem persists, please contact support with the error ID
            above.
          </p>
        </div>
      </div>
    </div>
  );
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
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  errorIcon: {
    fontSize: "4rem",
    marginBottom: "1.5rem",
  },
  errorTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  errorMessage: {
    fontSize: "1.1rem",
    color: "#6b7280",
    marginBottom: "2rem",
    lineHeight: "1.6",
  },
  errorDetails: {
    backgroundColor: "#f3f4f6",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  errorDigest: {
    fontSize: "0.9rem",
    color: "#374151",
    margin: 0,
  },
  code: {
    backgroundColor: "#e5e7eb",
    padding: "0.25rem 0.5rem",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "0.8rem",
  },
  errorActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "2rem",
  },
  retryButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  homeButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#6b7280",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  errorHelp: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "1.5rem",
  },
  helpText: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: 0,
  },
};
