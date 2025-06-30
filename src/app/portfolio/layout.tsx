import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Praveen Kushwaha - Portfolio",
  description:
    "Full Stack Developer & Problem Solver - React, Node.js, AWS, and modern web technologies",
  keywords: [
    "Full Stack Developer",
    "React",
    "Node.js",
    "AWS",
    "Portfolio",
    "Praveen Kushwaha",
  ],
  authors: [{ name: "Praveen Kushwaha" }],
  creator: "Praveen Kushwaha",
  openGraph: {
    title: "Praveen Kushwaha - Portfolio",
    description: "Full Stack Developer & Problem Solver",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Praveen Kushwaha - Portfolio",
    description: "Full Stack Developer & Problem Solver",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
