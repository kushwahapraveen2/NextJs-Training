import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Next.js</h1>
      </div>

      <div style={styles.features}>
        <h2 style={styles.sectionTitle}>🚀 Core Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>Portfolio</h3>
            <p style={styles.featureDescription}>
              Portfolio
            </p>
            <Link href="/portfolio" style={styles.featureLink}>
              View Portfolio →
            </Link>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>👥</div>
            <h3 style={styles.featureTitle}>User Management</h3>
            <p style={styles.featureDescription}>
              Server components fetching data from JSONPlaceholder API with
              dynamic routing and query parameters.
            </p>
            <Link href="/users" style={styles.featureLink}>
              View Users →
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📚</div>
            <h3 style={styles.featureTitle}>Diary System</h3>
            <p style={styles.featureDescription}>
              Protected routes with authentication, CRUD operations, and
              interactive features.
            </p>
            <Link href="/diary" style={styles.featureLink}>
              My Diaries →
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🖼️</div>
            <h3 style={styles.featureTitle}>Image Gallery</h3>
            <p style={styles.featureDescription}>
              Infinite scroll gallery with server-side rendering and client-side
              interactions.
            </p>
            <Link href="/imagegallery" style={styles.featureLink}>
              Browse Gallery →
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📊</div>
            <h3 style={styles.featureTitle}>Dashboard</h3>
            <p style={styles.featureDescription}>
              Analytics dashboard with real-time data and interactive charts.
            </p>
            <Link href="/dashboard" style={styles.featureLink}>
              View Dashboard →
            </Link>
          </div>
        </div>
      </div>

  
      <div style={styles.advancedFeatures}>
        <h2 style={styles.sectionTitle}>🔧 Advanced Features</h2>
        <div style={styles.advancedGrid}>
          <div style={styles.advancedCard}>
            <h3 style={styles.advancedTitle}>Intercepting Routes</h3>
            <p style={styles.advancedDescription}>
              Show routes in modals while preserving URL and navigation context.
            </p>
            <Link href="/interceptingroutes" style={styles.advancedLink}>
              Try Intercepting Routes →
            </Link>
          </div>

          <div style={styles.advancedCard}>
            <h3 style={styles.advancedTitle}>Route Groups</h3>
            <p style={styles.advancedDescription}>
              Organize routes with different layouts using route groups.
            </p>
            <Link href="/login" style={styles.advancedLink}>
              Auth Layout Demo →
            </Link>
          </div>

          <div style={styles.advancedCard}>
            <h3 style={styles.advancedTitle}>Error Handling</h3>
            <p style={styles.advancedDescription}>
              Custom error pages and loading states for better user experience.
            </p>
            <Link href="/nonexistent" style={styles.advancedLink}>
              Trigger 404 →
            </Link>
          </div>

          <div style={styles.advancedCard}>
            <h3 style={styles.advancedTitle}>Authentication</h3>
            <p style={styles.advancedDescription}>
              Dynamic header with login/logout functionality and protected
              routes.
            </p>
            <Link href="/login" style={styles.advancedLink}>
              Login/Signup →
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.techStack}>
        <h2 style={styles.sectionTitle}>🛠️ Technology Stack</h2>
        <div style={styles.techGrid}>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>⚛️</span>
            <span style={styles.techName}>React 18</span>
          </div>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>🚀</span>
            <span style={styles.techName}>Next.js 14</span>
          </div>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>📝</span>
            <span style={styles.techName}>TypeScript</span>
          </div>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>🎨</span>
            <span style={styles.techName}>Tailwind CSS</span>
          </div>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>🗄️</span>
            <span style={styles.techName}>Prisma</span>
          </div>
          <div style={styles.techItem}>
            <span style={styles.techIcon}>🔐</span>
            <span style={styles.techName}>JWT Auth</span>
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>
          Built with ❤️ for Next.js || Praveen Kushwaha
        </p>
        <div style={styles.footerLinks}>
          <Link href="/users" style={styles.footerLink}>
            Users
          </Link>
          <Link href="/diary" style={styles.footerLink}>
            Diary
          </Link>
          <Link href="/imagegallery" style={styles.footerLink}>
            Gallery
          </Link>
          <Link href="/dashboard" style={styles.footerLink}>
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  hero: {
    textAlign: "center",
    marginBottom: "4rem",
    padding: "3rem 0",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    color: "#6b7280",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "2rem",
    textAlign: "center",
  },
  features: {
    marginBottom: "4rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  featureCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  featureDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  featureLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  renderingMethods: {
    marginBottom: "4rem",
  },
  renderingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
  },
  renderingCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  renderingTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  renderingDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  renderingFeatures: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1.5rem",
  },
  renderingFeature: {
    padding: "0.25rem 0.75rem",
    backgroundColor: "#f0f9ff",
    color: "#0369a1",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "500",
  },
  renderingLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  advancedFeatures: {
    marginBottom: "4rem",
  },
  advancedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  advancedCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  advancedTitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  advancedDescription: {
    fontSize: "1rem",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  advancedLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "color 0.3s ease",
  },
  techStack: {
    marginBottom: "4rem",
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "1.5rem",
  },
  techItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  },
  techIcon: {
    fontSize: "1.5rem",
  },
  techName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1f2937",
  },
  footer: {
    textAlign: "center",
    padding: "3rem 0",
    borderTop: "1px solid #e5e7eb",
  },
  footerText: {
    fontSize: "1.1rem",
    color: "#6b7280",
    marginBottom: "1.5rem",
  },
  footerLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
  },
  footerLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
};
