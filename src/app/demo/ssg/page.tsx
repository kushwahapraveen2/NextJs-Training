// This is a Static Site Generation (SSG) demo using App Router
// This page is built at build time and served as static HTML

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface SSGDemoProps {
  posts: Post[];
  buildTime: string;
}

// This function runs at build time (npm run build)
async function getStaticData(): Promise<SSGDemoProps> {
  console.log("🔄 SSG: Building static page at build time...");

  // Simulate fetching data from an API
  const posts: Post[] = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      content:
        "Next.js is a React framework that makes building full-stack web applications simple and efficient.",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Understanding Static Generation",
      content:
        "Static generation pre-renders pages at build time, making them fast and SEO-friendly.",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Why Choose SSG?",
      content:
        "SSG is perfect for content that doesn't change frequently, like blog posts and documentation.",
      author: "Mike Johnson",
    },
  ];

  return {
    posts,
    buildTime: new Date().toLocaleString(),
  };
}

export default async function SSGDemo() {
  const { posts, buildTime } = await getStaticData();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>📚 SSG (Static Site Generation) Demo</h1>

      <div
        style={{
          background: "#f0f8ff",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "2px solid #007acc",
        }}
      >
        <h2>What is SSG?</h2>
        <p>
          <strong>Static Site Generation (SSG)</strong> pre-renders pages at
          build time. The HTML is generated once when you build your app and
          served to every user.
        </p>
        <ul>
          <li>
            ✅ <strong>Fastest</strong> - Pages are pre-built and served
            instantly
          </li>
          <li>
            ✅ <strong>SEO-friendly</strong> - Search engines can easily crawl
            static HTML
          </li>
          <li>
            ✅ <strong>Cost-effective</strong> - No server processing needed for
            each request
          </li>
          <li>
            ❌ <strong>Static content only</strong> - Data is frozen at build
            time
          </li>
        </ul>
        <p>
          <strong>Build Time:</strong> {buildTime}
        </p>
      </div>

      <h2>📝 Blog Posts (Static Content)</h2>
      <p>These posts were fetched at build time and are now static HTML:</p>

      <div style={{ display: "grid", gap: "1rem" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              background: "white",
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small style={{ color: "#666" }}>By: {post.author}</small>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#fff3cd",
          borderRadius: "8px",
          border: "1px solid #ffeaa7",
        }}
      >
        <h3>🔍 How to Test SSG:</h3>
        <ol>
          <li>
            Run <code>npm run build</code> - Notice the console log during build
          </li>
          <li>
            Run <code>npm start</code> - Page loads instantly
          </li>
          <li>View page source - You'll see the HTML is pre-rendered</li>
          <li>Disconnect internet - Page still works (it's static!)</li>
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
