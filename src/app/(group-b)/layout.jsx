// app/(group-b)/layout.tsx

export default function GroupBLayout({
  children,
}) {
  return (
    <div>
      <header>Header B</header>
      <aside>Sidebar B</aside>
      <main>{children}</main>
    </div>
  );
}
