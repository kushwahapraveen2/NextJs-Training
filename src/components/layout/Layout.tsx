"use client";


interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) {
  return (
    <div style={styles.layout}>
      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
};
