"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout/Layout";
import ProtectedRoute from "../../components/auth/ProtectedRoute";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { api } from "../../lib/api-client";
import { Diary } from "../../types";
import { getCurrentUser } from "../../lib/auth-utils";
import Link from "next/link";
import AuthGuard from "../../components/auth/AuthGuard";
import { User } from "../../types";

export default function DiaryPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (!currentUser || !currentUser.id) {
      // Redirect to login if no user is found
      window.location.href = "/login";
      return;
    }

    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();

      if (!currentUser || !currentUser.id) {
        setError("Please log in to view your diaries");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/diary?userId=${currentUser.id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch diaries");
      }

      const data = await response.json();
      setDiaries(data.diaries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleLike = async (diaryId: string) => {
    try {
      const currentUser = getCurrentUser();

      if (!currentUser || !currentUser.id) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch(`/api/diary/${diaryId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (response.ok) {
        fetchDiaries();
      }
    } catch (err) {
      console.error("Failed to like diary:", err);
    }
  };

  if (loading) {
    return (
      <AuthGuard>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your diaries...</p>
        </div>
      </AuthGuard>
    );
  }

  if (error) {
    return (
      <AuthGuard>
        <div style={styles.errorContainer}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h2 style={styles.errorTitle}>Error Loading Diaries</h2>
            <p style={styles.errorMessage}>{error}</p>
            <button onClick={fetchDiaries} style={styles.retryButton}>
              🔄 Try Again
            </button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ProtectedRoute>
        <Layout>
          <div style={styles.container}>
            <div style={styles.header}>
              <div style={styles.titleSection}>
                <h1 style={styles.title}>My Travel Diaries 📚</h1>
                <p style={styles.subtitle}>
                  {diaries.length} {diaries.length === 1 ? "entry" : "entries"}{" "}
                  in your collection
                </p>
              </div>
              <Link href="/diary/new" style={styles.newButton}>
                ✏️ New Entry
              </Link>
            </div>

            {error && (
              <div style={styles.errorAlert}>
                <span style={styles.errorIcon}>⚠️</span>
                {error}
              </div>
            )}

            {diaries.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📝</div>
                <h2 style={styles.emptyTitle}>No diaries yet</h2>
                <p style={styles.emptyText}>
                  Start documenting your travel adventures by creating your
                  first diary entry.
                </p>
                <Link href="/diary/new" style={styles.emptyButton}>
                  Create Your First Entry
                </Link>
              </div>
            ) : (
              <div style={styles.diariesGrid}>
                {diaries.map((diary) => (
                  <div key={diary.id} style={styles.diaryCard}>
                    <div style={styles.diaryImage}>
                      {diary.coverImage ? (
                        <img
                          src={diary.coverImage}
                          alt={diary.title}
                          style={styles.coverImage}
                        />
                      ) : (
                        <div style={styles.placeholderImage}>
                          <span style={styles.placeholderIcon}>🌍</span>
                        </div>
                      )}
                      <div style={styles.diaryStatus}>
                        {diary.isPublic ? (
                          <span style={styles.publicBadge}>🌐 Public</span>
                        ) : (
                          <span style={styles.privateBadge}>🔒 Private</span>
                        )}
                      </div>
                    </div>

                    <div style={styles.diaryContent}>
                      <h3 style={styles.diaryTitle}>{diary.title}</h3>
                      <p style={styles.diaryLocation}>
                        📍 {diary.location || "No location specified"}
                      </p>
                      <p style={styles.diaryDate}>
                        📅 {formatDate(diary.createdAt)}
                      </p>
                      <p style={styles.diaryPreview}>
                        {diary.content.length > 150
                          ? `${diary.content.substring(0, 150)}...`
                          : diary.content}
                      </p>

                      {diary.weather && (
                        <div style={styles.weatherInfo}>
                          <span style={styles.weatherIcon}>🌤️</span>
                          <span style={styles.weatherText}>
                            {diary.weather.condition} •{" "}
                            {diary.weather.temperature}°C
                          </span>
                        </div>
                      )}

                      <div style={styles.diaryActions}>
                        <button
                          onClick={() => handleLike(diary.id)}
                          style={styles.likeButton}
                        >
                          ❤️ {diary.likes}
                        </button>
                        <Link
                          href={`/diary/${diary.id}`}
                          style={styles.viewButton}
                        >
                          👁️ View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Layout>
      </ProtectedRoute>
    </AuthGuard>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "3rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  titleSection: {
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
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    color: "#dc2626",
    marginBottom: "2rem",
  },
  errorIcon: {
    fontSize: "1.2rem",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  emptyText: {
    color: "#6b7280",
    marginBottom: "2rem",
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  diariesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "2rem",
  },
  diaryCard: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  diaryImage: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    fontSize: "3rem",
    color: "white",
  },
  diaryStatus: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
  },
  publicBadge: {
    background: "rgba(34, 197, 94, 0.9)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  privateBadge: {
    background: "rgba(107, 114, 128, 0.9)",
    color: "white",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  diaryContent: {
    padding: "1.5rem",
  },
  diaryTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  diaryLocation: {
    color: "#6b7280",
    fontSize: "0.9rem",
    marginBottom: "0.25rem",
  },
  diaryDate: {
    color: "#9ca3af",
    fontSize: "0.8rem",
    marginBottom: "1rem",
  },
  diaryPreview: {
    color: "#4b5563",
    fontSize: "0.9rem",
    lineHeight: "1.5",
    marginBottom: "1.5rem",
  },
  weatherInfo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    padding: "0.5rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "8px",
  },
  weatherIcon: {
    fontSize: "1rem",
  },
  weatherText: {
    fontSize: "0.9rem",
    color: "#0369a1",
    fontWeight: "500",
  },
  diaryActions: {
    display: "flex",
    gap: "0.5rem",
  },
  newButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
  },
  errorCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  errorTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  errorMessage: {
    color: "#6b7280",
    marginBottom: "1.5rem",
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
  emptyButton: {
    padding: "1rem 2rem",
    backgroundColor: "#3b82f6",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};
