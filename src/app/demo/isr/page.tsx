// This is an Incremental Static Regeneration (ISR) demo using App Router
// This page is built at build time but can be revalidated periodically

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  lastUpdated: string;
}

interface ISRDemoProps {
  products: Product[];
  buildTime: string;
  revalidateTime: number;
}

// This function runs at build time and can revalidate
async function getStaticData(): Promise<ISRDemoProps> {
  console.log("🔄 ISR: Building/Revalidating page...");

  // Simulate fetching product data
  const products: Product[] = [
    {
      id: 1,
      name: "Laptop Pro",
      price: 1299,
      stock: Math.floor(Math.random() * 50) + 10, // Random stock for demo
      lastUpdated: new Date().toLocaleString(),
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29,
      stock: Math.floor(Math.random() * 100) + 20,
      lastUpdated: new Date().toLocaleString(),
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: 149,
      stock: Math.floor(Math.random() * 30) + 5,
      lastUpdated: new Date().toLocaleString(),
    },
  ];

  return {
    products,
    buildTime: new Date().toLocaleString(),
    revalidateTime: 10, // Revalidate every 10 seconds
  };
}

// This is the key ISR feature - revalidate every 10 seconds
export const revalidate = 10;

export default async function ISRDemo() {
  const { products, buildTime, revalidateTime } = await getStaticData();

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔄 ISR (Incremental Static Regeneration) Demo</h1>

      <div
        style={{
          background: "#f0fff0",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          border: "2px solid #32cd32",
        }}
      >
        <h2>What is ISR?</h2>
        <p>
          <strong>Incremental Static Regeneration (ISR)</strong> combines the
          best of SSG and SSR. Pages are built at build time but can be updated
          in the background without rebuilding the entire site.
        </p>
        <ul>
          <li>
            ✅ <strong>Fast initial load</strong> - Served as static HTML
          </li>
          <li>
            ✅ <strong>Fresh data</strong> - Can update in background
          </li>
          <li>
            ✅ <strong>SEO-friendly</strong> - Static HTML for search engines
          </li>
          <li>
            ✅ <strong>Cost-effective</strong> - Only rebuilds when needed
          </li>
          <li>
            ❌ <strong>Stale data initially</strong> - First visitor might see
            old data
          </li>
        </ul>
        <p>
          <strong>Build Time:</strong> {buildTime}
        </p>
        <p>
          <strong>Revalidate Every:</strong> {revalidateTime} seconds
        </p>
      </div>

      <h2>🛍️ Product Inventory (ISR Data)</h2>
      <p>This data is static but can be updated in the background:</p>

      <div style={{ display: "grid", gap: "1rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              background: "white",
            }}
          >
            <h3>{product.name}</h3>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock} units
            </p>
            <p>
              <strong>Last Updated:</strong> {product.lastUpdated}
            </p>
            <div
              style={{
                background: product.stock > 20 ? "#e8f5e8" : "#fff3cd",
                padding: "0.5rem",
                borderRadius: "4px",
                marginTop: "0.5rem",
              }}
            >
              <strong>Status:</strong>{" "}
              {product.stock > 20 ? "In Stock" : "Low Stock"}
            </div>
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
        <h3>🔍 How to Test ISR:</h3>
        <ol>
          <li>Visit this page - You'll see static content</li>
          <li>Wait 10+ seconds and refresh - Data might update</li>
          <li>Check console - You'll see ISR logs</li>
          <li>Stock numbers change randomly - Shows background updates</li>
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
        <h3>💡 When to Use ISR:</h3>
        <ul>
          <li>E-commerce product pages</li>
          <li>Blog posts that update occasionally</li>
          <li>News articles</li>
          <li>Any content that changes but not frequently</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "#e3f2fd",
          borderRadius: "8px",
          border: "1px solid #2196f3",
        }}
      >
        <h3>⚙️ How ISR Works:</h3>
        <ol>
          <li>
            <strong>First visit:</strong> Page is served from static build
          </li>
          <li>
            <strong>Background:</strong> Next.js checks if revalidation is
            needed
          </li>
          <li>
            <strong>Update:</strong> If time has passed, page is regenerated
          </li>
          <li>
            <strong>Next visit:</strong> Updated page is served
          </li>
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
