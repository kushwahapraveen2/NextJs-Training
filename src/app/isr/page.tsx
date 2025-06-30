import Link from "next/link";

// This page uses ISR with revalidation every 30 seconds
export const revalidate = 30;

async function getTimeData() {
  // Simulate some data fetching
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    currentTime: new Date().toLocaleString(),
    buildTime: new Date().toLocaleString(),
    revalidationPeriod: "30 seconds",
  };
}

async function getRandomPosts() {
  // Fetch some posts from the API
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
    {
      next: { revalidate: 30 },
    }
  );
  return response.json();
}

export default async function ISRPage() {
  const timeData = await getTimeData();
  const posts = await getRandomPosts();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Incremental Static Regeneration (ISR)</h1>
        <p style={styles.subtitle}>
          This page is statically generated with periodic revalidation
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.revalidationInfo}>
          <h3 style={styles.revalidationInfoTitle}>🔄 Revalidation Methods</h3>
          <div style={styles.methodsGrid}>
            <div style={styles.methodCard}>
              <h4 style={styles.methodTitle}>Time-based</h4>
              <p style={styles.methodDescription}>
                Pages revalidate automatically after a specified time period
              </p>
              <code style={styles.codeExample}>
                export const revalidate = 3600; // 1 hour
              </code>
            </div>

            <div style={styles.methodCard}>
              <h4 style={styles.methodTitle}>On-demand</h4>
              <p style={styles.methodDescription}>
                Trigger revalidation manually via API routes
              </p>
              <code style={styles.codeExample}>
                await res.revalidate(&apos;/path&apos;);
              </code>
            </div>

            <div style={styles.methodCard}>
              <h4 style={styles.methodTitle}>Background</h4>
              <p style={styles.methodDescription}>
                Revalidation happens in the background without blocking requests
              </p>
            </div>
          </div>
        </div>

        <div style={styles.navigation}>
          <Link href="/ssr" style={styles.navButton}>
            ← Server Side Rendering
          </Link>
          <Link href="/interceptingroutes" style={styles.navButton}>
            Intercepting Routes →
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1000px",
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
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "2rem",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
  },
  featureIcon: {
    fontSize: "2rem",
    flexShrink: 0,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  featureText: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  timeInfo: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  timeInfoTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  timeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  timeCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  timeLabel: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  timeValue: {
    fontSize: "1.2rem",
    color: "#059669",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  timeNote: {
    fontSize: "0.9rem",
    color: "#6b7280",
    fontStyle: "italic",
    margin: 0,
  },
  apiData: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  apiDataTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  postsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  postCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  postTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  postBody: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.5",
    marginBottom: "1rem",
  },
  postMeta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
  postId: {
    fontWeight: "500",
  },
  postUser: {
    fontWeight: "500",
  },
  useCases: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  useCasesTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  useCasesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "0.75rem",
  },
  useCaseItem: {
    padding: "0.75rem",
    backgroundColor: "#f0fdf4",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#059669",
    fontWeight: "500",
  },
  revalidationInfo: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  revalidationInfoTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  methodsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  methodCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  methodTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  methodDescription: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.5",
    marginBottom: "1rem",
  },
  codeExample: {
    display: "block",
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: "0.75rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontFamily: "monospace",
    overflow: "auto",
  },
  navigation: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
  },
  navButton: {
    padding: "1rem 2rem",
    backgroundColor: "#3b82f6",
    color: "white",
    textDecoration: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  },
};
