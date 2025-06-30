// This is a Server-Side Rendering (SSR) demo using App Router
// This page is rendered on the server for each request

interface User {
  id: number;
  name: string;
  email: string;
  lastActive: string;
}

interface SSRDemoProps {
  users: User[];
  serverTime: string;
  requestId: string;
}

// This function runs on the server for each request
async function getServerData(): Promise<SSRDemoProps> {
  console.log("🔄 SSR: Rendering page on server for request...");

  // Simulate fetching fresh data from an API
  const users: User[] = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      lastActive: new Date().toLocaleString(),
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      lastActive: new Date().toLocaleString(),
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      lastActive: new Date().toLocaleString(),
    },
  ];

  // Generate a unique request ID to show this is a fresh request
  const requestId = Math.random().toString(36).substring(7);

  return {
    users,
    serverTime: new Date().toLocaleString(),
    requestId,
  };
}

export default async function SSRDemo() {
  const { users, serverTime, requestId } = await getServerData();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>⚡ SSR (Server-Side Rendering) Demo</h1>

      <div
        style={{
          background: "#fff0f0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "2px solid #ff6b6b",
        }}
      >
        <h2>What is SSR?</h2>
        <p>
          <strong>Server-Side Rendering (SSR)</strong> renders pages on the
          server for each request. The HTML is generated fresh every time a user
          visits the page.
        </p>
        <ul>
          <li>
            ✅ <strong>Always fresh data</strong> - Content updates with each
            request
          </li>
          <li>
            ✅ <strong>SEO-friendly</strong> - Search engines see fully rendered
            HTML
          </li>
          <li>
            ✅ <strong>User-specific content</strong> - Can show personalized
            data
          </li>
          <li>
            ❌ <strong>Slower than SSG</strong> - Server processing for each
            request
          </li>
          <li>
            ❌ <strong>Higher server costs</strong> - More server resources
            needed
          </li>
        </ul>
        <p>
          <strong>Server Time:</strong> {serverTime}
        </p>
        <p>
          <strong>Request ID:</strong> {requestId} (unique for each request)
        </p>
      </div>

      <h2>👥 Active Users (Fresh Data)</h2>
      <p>This data is fetched fresh from the server on every page load:</p>

      <div style={{ display: "grid", gap: "1rem" }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              background: "white",
            }}
          >
            <h3>{user.name}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Last Active:</strong> {user.lastActive}
            </p>
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
        <h3>🔍 How to Test SSR:</h3>
        <ol>
          <li>Refresh the page - Notice the server time changes</li>
          <li>Check the console - You'll see the SSR log for each request</li>
          <li>View page source - HTML is rendered on server</li>
          <li>Request ID changes - Shows fresh server processing</li>
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
        <h3>💡 When to Use SSR:</h3>
        <ul>
          <li>E-commerce sites with real-time inventory</li>
          <li>Social media feeds with live content</li>
          <li>Dashboard with user-specific data</li>
          <li>Any page that needs fresh data on every visit</li>
        </ul>
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
