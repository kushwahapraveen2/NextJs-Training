"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/layout/Layout";
import ProtectedRoute from "../../../components/auth/ProtectedRoute";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { getCurrentUser } from "../../../lib/auth-utils";

interface WeatherData {
  icon: string;
  temperature: number;
  condition: string;
  location: string;
}

export default function CreateDiary() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const router = useRouter();

  const fetchWeatherData = async (location: string) => {
    if (!location.trim()) return;

    try {
      setIsLoadingWeather(true);
      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`
      );
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    // Fetch weather data when location changes (with debounce)
    const timeoutId = setTimeout(() => {
      if (value.trim()) {
        fetchWeatherData(value);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = getCurrentUser();
      if (!user || !user.id) {
        throw new Error("User not authenticated");
      }

      const response = await fetch("/api/diary", {
        method: "POST",
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
          content,
          coverImage,
          images,
          location,
          isPublic,
          weatherAtTime: weatherData,
          authorId: user.id,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/diary");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create diary");
      }
    } catch (error) {
      console.error("Error creating diary:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create diary. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div style={styles.container}>
          <div style={styles.header}>
            <h1 style={styles.title}>📝 Create New Diary Entry</h1>
            <p style={styles.subtitle}>
              Document your travel adventures and memories
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Basic Information</h3>

              <Input
                value={title}
                onChange={setTitle}
                placeholder="Enter diary title"
                label="Title"
                required
                icon="📖"
                fullWidth
              />

              <Input
                value={slug}
                onChange={setSlug}
                placeholder="Custom URL slug (optional)"
                label="URL Slug"
                icon="🔗"
                fullWidth
              />

              <Input
                value={location}
                onChange={handleLocationChange}
                placeholder="Where did this adventure take place?"
                label="Location"
                icon="📍"
                fullWidth
              />
            </div>

            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Content</h3>

              <div style={styles.textareaContainer}>
                <label style={styles.label}>Story Content *</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your travel story, experiences, and memories..."
                  required
                  rows={8}
                  style={styles.textarea}
                />
              </div>
            </div>

            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Media</h3>

              <Input
                value={coverImage}
                onChange={setCoverImage}
                placeholder="Cover image URL"
                label="Cover Image"
                icon="🖼️"
                fullWidth
              />

              <div style={styles.imagesContainer}>
                <label style={styles.label}>Additional Images</label>
                <Input
                  value={images.join(", ")}
                  onChange={(value) =>
                    setImages(
                      value
                        .split(",")
                        .map((img) => img.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="Image URLs separated by commas"
                  icon="📸"
                  fullWidth
                />
                <p style={styles.helpText}>
                  Add multiple image URLs separated by commas
                </p>
              </div>
            </div>

            {/* Weather Section */}
            {location && (
              <div style={styles.formSection}>
                <h3 style={styles.sectionTitle}>Weather Snapshot</h3>
                <div style={styles.weatherSection}>
                  {isLoadingWeather ? (
                    <div style={styles.weatherLoading}>
                      <LoadingSpinner size="sm" text="Loading weather..." />
                    </div>
                  ) : weatherData ? (
                    <div style={styles.weatherCard}>
                      <div style={styles.weatherIcon}>{weatherData.icon}</div>
                      <div style={styles.weatherInfo}>
                        <div style={styles.weatherTemp}>
                          {weatherData.temperature}°C
                        </div>
                        <div style={styles.weatherCondition}>
                          {weatherData.condition}
                        </div>
                        <div style={styles.weatherLocation}>
                          {weatherData.location}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p style={styles.weatherPlaceholder}>
                      Weather data will appear here when you enter a location
                    </p>
                  )}
                </div>
              </div>
            )}

            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>Settings</h3>

              <div style={styles.checkboxRow}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    style={styles.checkbox}
                  />
                  <span style={styles.checkboxText}>
                    Make this diary public (visible to everyone)
                  </span>
                </label>
              </div>
            </div>

            <div style={styles.submitSection}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Diary...
                  </>
                ) : (
                  "📤 Create Diary Entry"
                )}
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  formSection: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  textareaContainer: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  },
  textarea: {
    minHeight: "200px",
    padding: "1rem",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    transition: "border-color 0.3s ease",
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "column",
  },
  helpText: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginTop: "0.5rem",
  },
  weatherSection: {
    display: "flex",
    justifyContent: "center",
  },
  weatherLoading: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "2rem",
  },
  weatherCard: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    padding: "1.5rem",
    backgroundColor: "#f0f9ff",
    borderRadius: "16px",
    border: "2px solid #bae6fd",
    minWidth: "300px",
  },
  weatherIcon: {
    fontSize: "3rem",
  },
  weatherInfo: {
    display: "flex",
    flexDirection: "column",
  },
  weatherTemp: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0369a1",
  },
  weatherCondition: {
    color: "#0c4a6e",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  weatherLocation: {
    color: "#0c4a6e",
    fontSize: "0.9rem",
  },
  weatherPlaceholder: {
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center",
    padding: "2rem",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    cursor: "pointer",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    accentColor: "#667eea",
  },
  checkboxText: {
    color: "#374151",
    fontSize: "1rem",
  },
  submitSection: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "1rem",
  },
};
