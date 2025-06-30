"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../../components/layout/Layout";
import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import Button from "../../../components/ui/Button";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { getCurrentUser } from "../../../lib/auth-utils";
import { Diary, User } from "../../../types";

interface WeatherData {
  icon: string;
  temperature: number;
  condition: string;
  location: string;
}

export default function ViewDiary() {
  const params = useParams();
  const id =
    params && typeof params.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    const fetchDiary = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/diary/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch diary");
        }
        const data = await res.json();
        setDiary(data);
        setLikeCount(data.likes || 0);
      } catch (error: any) {
        setError(error.message || "Failed to load diary");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchDiary();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return;

    try {
      const response = await fetch(`/api/diary/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUser.id }),
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: diary?.title || "Travel Diary",
        text:
          diary?.content?.substring(0, 100) || "Check out this travel diary!",
        url: window.location.href,
      });
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
      setShowShareModal(false);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWeatherIcon = (weatherData: any) => {
    if (!weatherData) return "🌤️";

    const condition = weatherData.condition?.toLowerCase() || "";
    if (condition.includes("sun") || condition.includes("clear")) return "☀️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("storm")) return "⛈️";
    if (condition.includes("fog") || condition.includes("mist")) return "🌫️";
    return "🌤️";
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div style={styles.loadingContainer}>
            <LoadingSpinner size="lg" text="Loading diary..." />
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error || !diary) {
    return (
      <ProtectedRoute>
        <Layout>
          <div style={styles.errorContainer}>
            <div style={styles.errorContent}>
              <div style={styles.errorIcon}>📝</div>
              <h2 style={styles.errorTitle}>{error || "Diary not found"}</h2>
              <p style={styles.errorText}>
                The diary youre looking for doesnt exist or has been removed.
              </p>
              <Button
                onClick={() => router.push("/diary")}
                variant="primary"
                size="lg"
              >
                ← Back to Diaries
              </Button>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  const isAuthor = currentUser?.id === diary.authorId;
  const weatherData = diary.weatherAtTime as WeatherData;

  return (
    <ProtectedRoute>
      <Layout>
        <div style={styles.container}>
          {/* Navigation Header */}
          <div style={styles.navigationHeader}>
            <Button
              onClick={() => router.push("/diary")}
              variant="ghost"
              size="sm"
              className="back-button"
            >
              ← Back to Diaries
            </Button>

            <div style={styles.actionButtons}>
              {isAuthor && (
                <Button
                  onClick={() => router.push(`/diary/${diary.id}/edit`)}
                  variant="primary"
                  size="sm"
                >
                  ✏️ Edit
                </Button>
              )}
              <Button
                onClick={handleLike}
                variant={isLiked ? "primary" : "outline"}
                size="sm"
              >
                {isLiked ? "❤️" : "🤍"} {likeCount}
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                📤 Share
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          {diary.coverImage && (
            <div style={styles.coverImageContainer}>
              <img
                src={diary.coverImage}
                alt={diary.title}
                style={styles.coverImage}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Main Content */}
          <div style={styles.contentContainer}>
            {/* Title & Metadata */}
            <div style={styles.headerSection}>
              <h1 style={styles.title}>{diary.title}</h1>

              <div style={styles.metadata}>
                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>📍</span>
                  <span style={styles.metaText}>
                    {diary.location || "No location specified"}
                  </span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>📅</span>
                  <span style={styles.metaText}>
                    {formatDate(diary.createdAt)}
                  </span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaIcon}>
                    {diary.isPublic ? "🌐" : "🔒"}
                  </span>
                  <span style={styles.metaText}>
                    {diary.isPublic ? "Public" : "Private"}
                  </span>
                </div>
              </div>

              {/* Weather Snapshot */}
              {weatherData && (
                <div style={styles.weatherCard}>
                  <div style={styles.weatherIcon}>
                    {getWeatherIcon(weatherData)}
                  </div>
                  <div style={styles.weatherInfo}>
                    <div style={styles.weatherTemp}>
                      {weatherData.temperature}°C
                    </div>
                    <div style={styles.weatherCondition}>
                      {weatherData.condition}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div style={styles.mainContent}>
              <div style={styles.contentText}>
                {diary.content.split("\n").map((paragraph, index) => (
                  <p key={index} style={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Additional Images Gallery */}
            {diary.images && diary.images.length > 0 && (
              <div style={styles.gallerySection}>
                <h3 style={styles.galleryTitle}>📸 Photo Gallery</h3>

                {/* Main Gallery Image */}
                <div style={styles.mainGalleryImage}>
                  <img
                    src={diary.images[currentImageIndex]}
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    style={styles.galleryImage}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Gallery Navigation */}
                  {diary.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? diary.images.length - 1 : prev - 1
                          )
                        }
                        style={styles.galleryNavButton}
                        className="gallery-nav-left"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex((prev) =>
                            prev === diary.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        style={styles.galleryNavButton}
                        className="gallery-nav-right"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {diary.images.length > 1 && (
                  <div style={styles.thumbnailContainer}>
                    {diary.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        style={{
                          ...styles.thumbnail,
                          ...(index === currentImageIndex &&
                            styles.activeThumbnail),
                        }}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          style={styles.thumbnailImage}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div
            style={styles.modalOverlay}
            onClick={() => setShowShareModal(false)}
          >
            <div style={styles.shareModal} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>Share this diary</h3>
              <div style={styles.shareOptions}>
                <Button
                  onClick={copyToClipboard}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  📋 Copy Link
                </Button>
                <Button
                  onClick={() => setShowShareModal(false)}
                  variant="outline"
                  size="lg"
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    padding: "2rem",
  },
  errorContent: {
    textAlign: "center",
    maxWidth: "400px",
  },
  errorIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  errorTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#374151",
    marginBottom: "0.5rem",
  },
  errorText: {
    color: "#6b7280",
    marginBottom: "2rem",
    lineHeight: "1.5",
  },
  navigationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "white",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: "70px",
    zIndex: 10,
  },
  actionButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  coverImageContainer: {
    width: "100%",
    height: "400px",
    overflow: "hidden",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  headerSection: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
    lineHeight: "1.2",
  },
  metadata: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  metaIcon: {
    fontSize: "1.2rem",
  },
  metaText: {
    color: "#6b7280",
    fontWeight: "500",
  },
  weatherCard: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "12px",
    border: "1px solid #bae6fd",
  },
  weatherIcon: {
    fontSize: "2rem",
  },
  weatherInfo: {
    display: "flex",
    flexDirection: "column",
  },
  weatherTemp: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#0369a1",
  },
  weatherCondition: {
    color: "#0c4a6e",
    fontSize: "0.9rem",
  },
  mainContent: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  contentText: {
    lineHeight: "1.8",
    fontSize: "1.1rem",
    color: "#374151",
  },
  paragraph: {
    marginBottom: "1.5rem",
  },
  gallerySection: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  galleryTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  mainGalleryImage: {
    position: "relative",
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  galleryNavButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "1.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  thumbnailContainer: {
    display: "flex",
    gap: "0.5rem",
    overflowX: "auto",
    padding: "0.5rem 0",
  },
  thumbnail: {
    flexShrink: 0,
    width: "80px",
    height: "80px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  activeThumbnail: {
    borderColor: "#3b82f6",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  shareModal: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    maxWidth: "400px",
    width: "90%",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  shareOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
};
