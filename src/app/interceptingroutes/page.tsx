import Link from "next/link";
import React from "react";

export default function InterceptingRoutesPage() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Intercepting Routes</h1>
        <p style={styles.subtitle}>
          Learn how to intercept and display routes in modals or overlays
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.infoCard}>
          <h2 style={styles.cardTitle}>🔄 How Intercepting Routes Work</h2>
          <p style={styles.description}>
            Intercepting routes allow you to show a route in the current layout
            context (like a modal) while preserving the URL. This creates a
            seamless user experience where users can navigate without losing
            their current page context.
          </p>

          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎯</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Same Level</h3>
                <p style={styles.featureText}>
                  Intercept routes at the same level in the route hierarchy
                </p>
              </div>
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>⬆️</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>One Level Above</h3>
                <p style={styles.featureText}>
                  Intercept routes from one level above the current route
                </p>
              </div>
            </div>

            <div style={styles.feature}>
              <span style={styles.featureIcon}>⬆️⬆️</span>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Two Levels Above</h3>
                <p style={styles.featureText}>
                  Intercept routes from two levels above the current route
                </p>
              </div>
            </div>

            
          </div>
        </div>

        <div style={styles.implementation}>
          <h3 style={styles.implementationTitle}>🔧 Implementation</h3>
          <div style={styles.codeSection}>
            <h4 style={styles.codeTitle}>File Structure</h4>
            <div style={styles.codeBlock}>
              <pre style={styles.code}>
                {`
├── interceptingroutes
│   ├── About
│   │   ├── (..)Home
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── Home
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── Store
│       └── page.tsx
`}
              </pre>
            </div>
          </div>
        </div>

     

        <div style={styles.navigation}>
          <Link href="/isr" style={styles.navButton}>
            ← Incremental Static Regeneration
          </Link>
          <Link href="/" style={styles.navButton}>
            Home →
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
    backgroundColor: "#fef3c7",
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
  demoSection: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  demoTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  demoDescription: {
    fontSize: "1.1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "2rem",
  },
  demoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  demoCard: {
    padding: "1.5rem",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  demoCardTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  demoCardDescription: {
    fontSize: "0.95rem",
    color: "#6b7280",
    marginBottom: "1rem",
  },
  demoLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  demoLink: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
  implementation: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  implementationTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  codeSection: {
    marginBottom: "2rem",
  },
  codeTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  codeBlock: {
    backgroundColor: "#1f2937",
    borderRadius: "8px",
    overflow: "auto",
  },
  code: {
    color: "#f9fafb",
    fontSize: "0.9rem",
    fontFamily: "monospace",
    padding: "1rem",
    margin: 0,
    lineHeight: "1.5",
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
    backgroundColor: "#fef3c7",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#92400e",
    fontWeight: "500",
  },
  benefits: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  benefitsTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1.5rem",
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  benefitCard: {
    padding: "1.5rem",
    backgroundColor: "#f0fdf4",
    borderRadius: "12px",
    border: "1px solid #bbf7d0",
  },
  benefitTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  benefitText: {
    fontSize: "0.95rem",
    color: "#6b7280",
    lineHeight: "1.5",
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
