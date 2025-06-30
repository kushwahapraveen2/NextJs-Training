export default async function ISRPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 10 }, // Revalidate every 10 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await res.json();

  return (
    <div>
      <h1>ISR Page (User List)</h1>
      <p>This page uses Incremental Static Regeneration (every 10 seconds).</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
