export async function generateMetadata(data) {
    const { id } = await data;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  if (!res.ok) {
    return {
      title: "User Not Found",
    }
  }

  const user = await res.json();

  return {
    title: `${user.name} | User Details`,
  };
}

export default async function UserPage(data) {
    const { id } = await data;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${(id)}`,
    {
      next: { revalidate: 60 },
    }
  );
  const user = await res.json();

  return (
    <div style={{ padding: "1rem" }}>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Website:</strong> {user.website}
      </p>
    </div>
  );
}
