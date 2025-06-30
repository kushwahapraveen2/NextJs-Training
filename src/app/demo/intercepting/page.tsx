// This is an Intercepting Routes demo
// Shows how to intercept navigation and show content in a modal/overlay

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface Photo {
  id: number;
  title: string;
  url: string;
  description: string;
}

const photos: Photo[] = [
  {
    id: 1,
    title: "Mountain Landscape",
    url: "https://picsum.photos/400/300?random=1",
    description: "Beautiful mountain scenery with snow-capped peaks.",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    url: "https://picsum.photos/400/300?random=2",
    description: "Stunning sunset over the ocean waves.",
  },
  {
    id: 3,
    title: "Forest Path",
    url: "https://picsum.photos/400/300?random=3",
    description: "Peaceful forest trail through tall trees.",
  },
];

export default function InterceptingDemo() {
  const router = useRouter();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔄 Intercepting Routes Demo</h1>

      <div
        style={{
          background: "#f0f8ff",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "2px solid #007acc",
        }}
      >
        <h2>What are Intercepting Routes?</h2>
        <p>
          <strong>Intercepting Routes</strong> allow you to intercept navigation
          and show content in a modal or overlay while keeping the current page
          visible in the background.
        </p>
        <ul>
          <li>
            ✅ <strong>Better UX</strong> - No full page navigation
          </li>
          <li>
            ✅ <strong>Context preservation</strong> - Background page stays
            visible
          </li>
          <li>
            ✅ <strong>Modal-like experience</strong> - Content appears in
            overlay
          </li>
          <li>
            ✅ <strong>URL updates</strong> - Browser URL reflects the route
          </li>
        </ul>
      </div>

      <h2>📸 Photo Gallery</h2>
      <p>Click on a photo to see it in a modal overlay:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              background: "white",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={photo.url}
              alt={photo.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <h3>{photo.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                {photo.description}
              </p>
              <Link
                href={`/demo/intercepting/photo/${photo.id}`}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: "#007acc",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  marginTop: "0.5rem",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#fff3cd",
          borderRadius: "8px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3>🔍 How to Test Intercepting Routes:</h3>
        <ol>
          <li>Click "View Details" on any photo</li>
          <li>Notice the photo opens in a modal overlay</li>
          <li>The background gallery page stays visible</li>
          <li>URL updates to show the photo route</li>
          <li>Click outside or use browser back to close</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#e8f5e8",
          borderRadius: "8px",
          border: "1px solid #4caf50",
        }}
      >
        <h3>💡 When to Use Intercepting Routes:</h3>
        <ul>
          <li>Photo galleries and image viewers</li>
          <li>Product detail modals</li>
          <li>User profile overlays</li>
          <li>Any content that should appear as a modal</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#e3f2fd",
          borderRadius: "8px",
          border: "1px solid #2196f3",
        }}
      >
        <h3>⚙️ How Intercepting Routes Work:</h3>
        <ol>
          <li>
            <strong>Route Structure:</strong> Create parallel routes with @modal
          </li>
          <li>
            <strong>Navigation:</strong> User clicks a link to a route
          </li>
          <li>
            <strong>Interception:</strong> Next.js intercepts and shows in modal
          </li>
          <li>
            <strong>Background:</strong> Original page stays visible behind
            modal
          </li>
        </ol>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <a
          href="/demo"
          style={{
            padding: "0.5rem 1rem",
            background: "#007acc",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          ← Back to Demos
        </a>
      </div>
    </div>
  );
}
