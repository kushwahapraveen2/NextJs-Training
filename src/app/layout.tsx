import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js",
  description:
    "A comprehensive Next.js application demonstrating various routing and rendering techniques",
  keywords: ["Next.js", "React", "TypeScript", "Training"],
  authors: [{ name: "Next.js Training Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Next.js",
    description:
      "A comprehensive Next.js application demonstrating various routing and rendering techniques",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js",
    description:
      "A comprehensive Next.js application demonstrating various routing and rendering techniques",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div style={styles.layout}>
          <Header />
          <div style={styles.mainContainer}>
            <Sidebar />
            <main style={styles.main}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f8fafc",
    minHeight: "calc(100vh - 70px)",
  },
};
