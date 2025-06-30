// app/(group-a)/layout.tsx

export default function GroupALayout({
  children,
}) {
  return (
    <div>
      <header>Header A</header>
      <aside>Sidebar A</aside>
      <main>{children}</main>
    </div>
  );
}
