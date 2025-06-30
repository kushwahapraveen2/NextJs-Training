// Force server-side rendering on every request
export const dynamic = "force-dynamic";

export default async function SSRPage() {
  const now = new Date().toISOString();

  return (
    <div>
      <h1>SSR Page</h1>
      <p>This page is rendered on each request.</p>
      <p>Server Time: {now}</p>
    </div>
  );
}
