import Link from "next/link";

// This page is statically generated at build time
export const dynamic = "force-static";

export default function SSGPage() {
  const buildTime = new Date().toLocaleString();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Static Site Generation (SSG)</h1>
        <p style={styles.subtitle}>
          This page is pre-rendered at build time for optimal performance
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.useCases}>
          <h3 style={styles.useCasesTitle}>Example:- </h3>
          <ul style={styles.useCasesList}>
            <li style={styles.useCaseItem}>
              <Link href={"/ssg/2"}>Page 2</Link>
            </li>
            <li style={styles.useCaseItem}>
              <Link href={"/ssg/3"}>Page 3</Link>
            </li>

            <li style={styles.useCaseItem}>
              <Link href={"/ssg/4"}>Page 4</Link>
            </li>
            <li style={styles.useCaseItem}>
              <Link href={"/ssg/5"}>Page 5</Link>
            </li>
          </ul>
        </div>

        <div style={styles.navigation}>
          <Link href="/ssr" style={styles.navButton}>
            ← Server Side Rendering
          </Link>
          <Link href="/isr" style={styles.navButton}>
            Incremental Static Regeneration →
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
    backgroundColor: "#f9fafb",
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
  buildInfo: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  buildTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  buildDetails: {
    display: "grid",
    gap: "0.75rem",
  },
  buildItem: {
    padding: "0.75rem",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#374151",
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
    backgroundColor: "#f0f9ff",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#0369a1",
    fontWeight: "500",
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
