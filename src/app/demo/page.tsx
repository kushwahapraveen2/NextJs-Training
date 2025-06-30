"use client"
export default function DemoPage() {
  const demos = [
    {
      id: "ssg",
      title: "📚 Static Site Generation (SSG)",
      description: "Pages built at build time and served as static HTML.",
      features: ["Fastest performance", "SEO-friendly", "Cost-effective"],
      color: "#007acc",
      href: "/demo/ssg",
    },
    {
      id: "ssr",
      title: "⚡ Server-Side Rendering (SSR)",
      description: "Pages rendered on the server for each request.",
      features: ["Always fresh data", "SEO-friendly", "User-specific content"],
      color: "#ff6b6b",
      href: "/demo/ssr",
    },
    {
      id: "isr",
      title: "🔄 Incremental Static Regeneration (ISR)",
      description:
        "Combines SSG and SSR. Pages built at build time but can be updated.",
      features: ["Fast initial load", "Fresh data", "Background updates"],
      color: "#32cd32",
      href: "/demo/isr",
    },
    {
      id: "intercepting",
      title: "🔄 Intercepting Routes",
      description: "Intercept navigation and show content in a modal.",
      features: ["Better UX", "Context preservation", "Modal-like experience"],
      color: "#9c27b0",
      href: "/demo/intercepting",
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🚀 Next.js Rendering Strategies Demo
      </h1>

      <div
        style={{
          background: "#f8f9fa",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "3rem",
          border: "2px solid #007acc",
        }}
      >
        <h2>What are Rendering Strategies?</h2>
        <p>
          Next.js offers different ways to render your pages, each with its own
          benefits and trade-offs. Understanding these strategies helps you
          choose the right approach for your application.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {demos.map((demo) => (
          <div
            key={demo.id}
            style={{
              border: `2px solid ${demo.color}`,
              borderRadius: "12px",
              padding: "1.5rem",
              background: "white",
              transition: "transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onClick={() => (window.location.href = demo.href)}
          >
            <h3
              style={{
                margin: "0 0 1rem 0",
                color: demo.color,
                fontSize: "1.3rem",
              }}
            >
              {demo.title}
            </h3>

            <p
              style={{
                margin: "0 0 1.5rem 0",
                lineHeight: "1.6",
                color: "#666",
              }}
            >
              {demo.description}
            </p>

            <div style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem" }}>
                Key Features:
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.2rem",
                  fontSize: "0.9rem",
                }}
              >
                {demo.features.map((feature, index) => (
                  <li key={index} style={{ margin: "0.25rem 0" }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  padding: "0.25rem 0.75rem",
                  background: demo.color,
                  color: "white",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                }}
              >
                {demo.id.toUpperCase()}
              </span>

              <span
                style={{
                  color: demo.color,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                Click to explore →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "#e3f2fd",
          borderRadius: "12px",
          border: "1px solid #2196f3",
        }}
      >
        <h3>🔍 How to Test These Demos:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <h4>SSG Demo:</h4>
            <ul style={{ fontSize: "0.9rem" }}>
              <li>
                Run <code>npm run build</code>
              </li>
              <li>Check console for build logs</li>
              <li>Page loads instantly</li>
            </ul>
          </div>
          <div>
            <h4>SSR Demo:</h4>
            <ul style={{ fontSize: "0.9rem" }}>
              <li>Refresh page multiple times</li>
              <li>Notice changing timestamps</li>
              <li>Check console for request logs</li>
            </ul>
          </div>
          <div>
            <h4>ISR Demo:</h4>
            <ul style={{ fontSize: "0.9rem" }}>
              <li>Wait 10+ seconds</li>
              <li>Refresh to see updates</li>
              <li>Stock numbers change randomly</li>
            </ul>
          </div>
          <div>
            <h4>Intercepting Routes:</h4>
            <ul style={{ fontSize: "0.9rem" }}>
              <li>Click View Details on photos</li>
              <li>Notice modal overlay</li>
              <li>Background page stays visible</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
        }}
      >
        <a
          href="/"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#007acc",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
