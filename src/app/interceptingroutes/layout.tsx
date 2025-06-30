// app/interceptingroutes/layout.js

import Link from "next/link";

function Layout({ children }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ color: "#333", textAlign: "center" }}>
        <Link href={"/interceptingroutes"}> Intercepting Routes</Link>
      </h1>

      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <li>
          <Link
            href="/interceptingroutes/Home"
            style={{
              textDecoration: "none",
              color: "#0070f3",
              fontWeight: "bold",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/interceptingroutes/About"
            style={{
              textDecoration: "none",
              color: "#0070f3",
              fontWeight: "bold",
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/interceptingroutes/Store"
            style={{
              textDecoration: "none",
              color: "#0070f3",
              fontWeight: "bold",
            }}
          >
            Store
          </Link>
        </li>
      </ul>

      <main
        style={{
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
