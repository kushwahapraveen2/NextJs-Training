import Link from "next/link";

// This page is server-side rendered on each request
export const dynamic = "force-dynamic";

async function getServerTime() {
  // Simulate some server-side processing
  await new Promise((resolve) => setTimeout(resolve, 100));
  return new Date().toLocaleString();
}

async function getRandomData() {
  // Simulate fetching data from an API
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function SSRPage() {
  const serverTime = await getServerTime();
  const postData = await getRandomData();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Server Side Rendering (SSR)</h1>
        <p style={styles.subtitle}>
          This page is rendered on the server for each request
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.infoCard}>
          <h2 style={styles.cardTitle}>⚡ How SSR Works</h2>
          <p style={styles.description}>
            Server Side Rendering generates HTML on the server for each request,
            providing fresh content and better SEO while maintaining
            interactivity through hydration.
          </p>

          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🔄</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Fresh Content</h3>
                <p style={styles.featureText}>
                  Content is generated fresh on each request
                </p>
              </div>
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>🔍</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>SEO Optimized</h3>
                <p style={styles.featureText}>
                  Search engines see fully rendered content
                </p>
              </div>
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>📱</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Fast Initial Load</h3>
                <p style={styles.featureText}>
                  Users see content immediately without waiting
                </p>
              </div>
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>🔐</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Secure</h3>
                <p style={styles.featureText}>
                  Sensitive data stays on the server
                </p>
              </div>
            </div>
          </div>
        </div>

    

   
  
        <div style={styles.navigation}>
          <Link href="/ssg" style={styles.navButton}>
            ← Static Site Generation
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
    backgroundColor: "#f0f9ff",
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
  liveData: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  liveDataTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  dataGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  dataCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  dataLabel: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  dataValue: {
    fontSize: "1.2rem",
    color: "#3b82f6",
    fontWeight: "600",
    marginBottom: "0.5rem",
  },
  dataNote: {
    fontSize: "0.9rem",
    color: "#6b7280",
    fontStyle: "italic",
    margin: 0,
  },
  apiData: {
    marginBottom: "0.5rem",
  },
  apiTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  apiBody: {
    fontSize: "0.9rem",
    color: "#6b7280",
    lineHeight: "1.4",
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
  comparison: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  comparisonTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  comparisonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  comparisonCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  comparisonLabel: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  comparisonList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
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
