"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function ImageGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver>();

  const lastImageElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchImages = async (pageNum: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=20`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const newImages = await response.json();

      if (newImages.length === 0) {
        setHasMore(false);
      } else {
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const handleImageClick = (image: GalleryImage) => {
    window.open(image.download_url, "_blank");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Image Gallery</h1>
        <p style={styles.subtitle}>
          Discover beautiful images from around the world
        </p>
      </div>

      {error && (
        <div style={styles.errorContainer}>
          <div style={styles.errorCard}>
            <div style={styles.errorIcon}>⚠️</div>
            <h3 style={styles.errorTitle}>Error Loading Images</h3>
            <p style={styles.errorMessage}>{error}</p>
            <button
              onClick={() => {
                setPage(1);
                setImages([]);
                setHasMore(true);
                fetchImages(1);
              }}
              style={styles.retryButton}
            >
              🔄 Try Again
            </button>
          </div>
        </div>
      )}

      <div style={styles.galleryGrid}>
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={index === images.length - 1 ? lastImageElementRef : null}
            style={styles.imageCard}
            onClick={() => handleImageClick(image)}
          >
            <div style={styles.imageContainer}>
              <Image
                src={image.download_url}
                alt={`Photo by ${image.author}`}
                width={400}
                height={300}
                style={styles.image}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <div style={styles.imageInfo}>
              <p style={styles.author}>By {image.author}</p>
              <p style={styles.dimensions}>
                {image.width} × {image.height}
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading more images...</p>
        </div>
      )}

      {!hasMore && images.length > 0 && (
        <div style={styles.endMessage}>
          <p style={styles.endText}>
            You&apos;ve reached the end of the gallery!
          </p>
        </div>
      )}

      {images.length === 0 && !loading && !error && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🖼️</div>
          <h2 style={styles.emptyTitle}>No images found</h2>
          <p style={styles.emptyMessage}>
            Try refreshing the page or check your internet connection.
          </p>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#6b7280",
    margin: 0,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  imageCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    border: "1px solid #e5e7eb",
  },
  imageContainer: {
    position: "relative",
    height: "250px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  imageInfo: {
    padding: "1rem",
  },
  author: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.25rem",
  },
  dimensions: {
    fontSize: "0.9rem",
    color: "#6b7280",
    margin: 0,
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
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
  endMessage: {
    textAlign: "center",
    padding: "3rem",
  },
  endText: {
    fontSize: "1.1rem",
    color: "#6b7280",
    margin: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  emptyMessage: {
    fontSize: "1.1rem",
    color: "#6b7280",
    margin: 0,
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  errorCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  },
  errorIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
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
};
