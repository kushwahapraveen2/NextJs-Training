// This is the actual photo route that gets intercepted
// When accessed directly, it shows the full page

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
    url: "https://picsum.photos/800/500?random=1",
    description:
      "Beautiful mountain scenery with snow-capped peaks. This breathtaking view showcases the majesty of nature's grandeur.",
    photographer: "John Smith",
    location: "Rocky Mountains, Colorado",
  },
  2: {
    id: 2,
    title: "Ocean Sunset",
    url: "https://picsum.photos/800/500?random=2",
    description:
      "Stunning sunset over the ocean waves. The golden hour creates a magical atmosphere as the sun dips below the horizon.",
    photographer: "Sarah Johnson",
    location: "Pacific Coast, California",
  },
  3: {
    id: 3,
    title: "Forest Path",
    url: "https://picsum.photos/800/500?random=3",
    description:
      "Peaceful forest trail through tall trees. The dappled sunlight creates a serene walking experience in nature.",
    photographer: "Mike Wilson",
    location: "Redwood Forest, Oregon",
  },
};

export default function PhotoPage({ params }: { params: { id: string } }) {
  const photo = photoData[parseInt(params.id)];

  if (!photo) {
    return (
      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Photo Not Found</h1>
        <p>The photo you're looking for doesn't exist.</p>
        <a
          href="/demo/intercepting"
          style={{
            padding: "0.5rem 1rem",
            background: "#007acc",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
          }}
        >
          Back to Gallery
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <a
          href="/demo/intercepting"
          style={{
            padding: "0.5rem 1rem",
            background: "#007acc",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            display: "inline-block",
            marginBottom: "1rem",
          }}
        >
          ← Back to Gallery
        </a>
      </div>

      <h1>{photo.title}</h1>

      <img
        src={photo.url}
        alt={photo.title}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      />

      <div
        style={{
          background: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <p
          style={{
            lineHeight: "1.8",
            fontSize: "1.1rem",
            margin: "0 0 1.5rem 0",
          }}
        >
          {photo.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <strong>Photographer:</strong> {photo.photographer}
          </div>
          <div>
            <strong>Location:</strong> {photo.location}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#e3f2fd",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid #2196f3",
        }}
      >
        <h3>💡 Intercepting Routes Demo</h3>
        <p>
          This is the full page view of the photo. When you navigate here from
          the gallery page, Next.js intercepts the route and shows it in a modal
          overlay instead of a full page navigation.
        </p>
        <p>
          <strong>Try this:</strong> Go back to the gallery and click "View
          Details" on any photo to see the intercepting route in action!
        </p>
      </div>
    </div>
  );
}
