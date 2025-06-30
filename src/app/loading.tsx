export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.loadingCard}>
        <div style={styles.spinner}>
          <div style={styles.spinnerInner}></div>
        </div>

        <h2 style={styles.loadingTitle}>Loading...</h2>

        <p style={styles.loadingMessage}>
          Please wait while we prepare your content.
        </p>

        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#f8fafc",
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  spinner: {
    width: "60px",
    height: "60px",
    margin: "0 auto 2rem",
    position: "relative",
  },
  spinnerInner: {
    width: "100%",
    height: "100%",
    border: "4px solid #e5e7eb",
    borderTop: "4px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  loadingMessage: {
    fontSize: "1rem",
    color: "#6b7280",
    marginBottom: "2rem",
  },
  progressBar: {
    width: "100%",
    height: "4px",
    backgroundColor: "#e5e7eb",
    borderRadius: "2px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: "2px",
    animation: "progress 2s ease-in-out infinite",
  },
};
