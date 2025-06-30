// This is the modal component for intercepting routes
// The (.) prefix tells Next.js to intercept this route

"use client";

import { useRouter } from "next/navigation";

interface Photo {
  id: number;
  title: string;
  url: string;
  description: string;
  photographer: string;
  location: string;
}

const photoData: Record<number, Photo> = {
  1: {
    id: 1,
    title: "Mountain Landscape",
    url: "https://picsum.photos/600/400?random=1",
    description:
      "Beautiful mountain scenery with snow-capped peaks. This breathtaking view showcases the majesty of nature's grandeur.",
    photographer: "John Smith",
    location: "Rocky Mountains, Colorado",
  },
  2: {
    id: 2,
    title: "Ocean Sunset",
    url: "https://picsum.photos/600/400?random=2",
    description:
      "Stunning sunset over the ocean waves. The golden hour creates a magical atmosphere as the sun dips below the horizon.",
    photographer: "Sarah Johnson",
    location: "Pacific Coast, California",
  },
  3: {
    id: 3,
    title: "Forest Path",
    url: "https://picsum.photos/600/400?random=3",
    description:
      "Peaceful forest trail through tall trees. The dappled sunlight creates a serene walking experience in nature.",
    photographer: "Mike Wilson",
    location: "Redwood Forest, Oregon",
  },
};

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();
  const photo = photoData[parseInt(params.id)];

  if (!photo) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "2rem",
            borderRadius: "8px",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          <h2>Photo Not Found</h2>
          <p>The photo you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            style={{
              padding: "0.5rem 1rem",
              background: "#007acc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={() => router.back()} // Close modal when clicking outside
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "1.2rem",
            zIndex: 1,
          }}
        >
          ×
        </button>

        {/* Photo */}
        <img
          src={photo.url}
          alt={photo.title}
          style={{
            width: "100%",
            height: "auto",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />

        {/* Photo details */}
        <div style={{ padding: "1.5rem" }}>
          <h2 style={{ margin: "0 0 1rem 0", color: "#333" }}>{photo.title}</h2>
          <p
            style={{
              margin: "0 0 1rem 0",
              lineHeight: "1.6",
              color: "#666",
            }}
          >
            {photo.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 0",
              borderTop: "1px solid #eee",
            }}
          >
            <div>
              <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                <strong>Photographer:</strong> {photo.photographer}
              </p>
              <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                <strong>Location:</strong> {photo.location}
              </p>
            </div>

            <button
              onClick={() => router.back()}
              style={{
                padding: "0.5rem 1rem",
                background: "#007acc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
