import Link from "next/link";
import Image from "next/image";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of Users</h1>

      <div style={styles.usersGrid}>
        {users.map((user) => (
          <div key={user.id} style={styles.userCard}>
            <div style={styles.userAvatar}>
              <Image
                src={`https://picsum.photos/200/200?random=${user.id}`}
                alt={`${user.name} avatar`}
                width={80}
                height={80}
                style={styles.avatar}
              />
            </div>

            <div style={styles.userInfo}>
              <h3 style={styles.userName}>{user.name}</h3>
              <p style={styles.userUsername}>@{user.username}</p>
              <p style={styles.userEmail}>{user.email}</p>
              <p style={styles.userCompany}>{user.company.name}</p>
              <p style={styles.userLocation}>
                📍 {user.address.city}, {user.address.zipcode}
              </p>
            </div>

            <div style={styles.userActions}>
              <Link href={`/users/${user.id}`} style={styles.viewButton}>
                View Details
              </Link>
              <Link
                href={`/users/${user.id}?tab=posts`}
                style={styles.viewButton}
              >
                View Posts
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "2rem",
    textAlign: "center",
  },
  usersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "2rem",
  },
  userCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    border: "1px solid #e5e7eb",
  },
  userAvatar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  avatar: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  userInfo: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  userName: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  userUsername: {
    color: "#6b7280",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  userEmail: {
    color: "#3b82f6",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  userCompany: {
    color: "#059669",
    fontSize: "0.9rem",
    fontWeight: "500",
    marginBottom: "0.5rem",
  },
  userLocation: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  userActions: {
    display: "flex",
    gap: "0.5rem",
    justifyContent: "center",
  },
  viewButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "background-color 0.3s ease",
  },
};
