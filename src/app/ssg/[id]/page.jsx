// Pre-generates these pages at build time
export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }];
}

export default function SSGPage({ params }) {
  return (
    <div>
      <h1>SSG Page</h1>
      <p>This page is statically generated at build time.</p>
      <p>ID: {params.id}</p>
    </div>
  );
}
