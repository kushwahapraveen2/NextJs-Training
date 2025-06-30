import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Album {
  id: number;
  title: string;
  userId: number;
}

interface UserDetailPageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

async function getUserPosts(userId: string): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getUserAlbums(userId: string): Promise<Album[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function UserDetailPage({
  params,
  searchParams,
}: UserDetailPageProps) {
  const user = await getUser(params.id);
  const activeTab = searchParams.tab || "details";

  if (!user) {
    notFound();
  }

  let posts: Post[] = [];
  let albums: Album[] = [];

  if (activeTab === "posts") {
    posts = await getUserPosts(params.id);
  } else if (activeTab === "albums") {
    albums = await getUserAlbums(params.id);
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Link href="/users" style={styles.backButton}>
          ← Back to Users
        </Link>
        <h1 style={styles.title}>{user.name}</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.userCard}>
          <div style={styles.userHeader}>
            <Image
              src={`https://picsum.photos/200/200?random=${user.id}`}
              alt={`${user.name} avatar`}
              width={120}
              height={120}
              style={styles.avatar}
            />
            <div style={styles.userBasicInfo}>
              <h2 style={styles.userName}>{user.name}</h2>
              <p style={styles.userUsername}>@{user.username}</p>
              <p style={styles.userEmail}>{user.email}</p>
              <p style={styles.userWebsite}>
                🌐{" "}
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={styles.tabNavigation}>
            <Link
              href={`/users/${user.id}`}
              style={{
                ...styles.tab,
                ...(activeTab === "details" && styles.activeTab),
              }}
            >
              Details
            </Link>
            <Link
              href={`/users/${user.id}?tab=posts`}
              style={{
                ...styles.tab,
                ...(activeTab === "posts" && styles.activeTab),
              }}
            >
              Posts ({posts.length})
            </Link>
            <Link
              href={`/users/${user.id}?tab=albums`}
              style={{
                ...styles.tab,
                ...(activeTab === "albums" && styles.activeTab),
              }}
            >
              Albums ({albums.length})
            </Link>
          </div>

          {/* Tab Content */}
          <div style={styles.tabContent}>
            {activeTab === "details" && (
              <div style={styles.detailsContent}>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📞 Contact Information</h3>
                  <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                      <strong>Phone:</strong> {user.phone}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Website:</strong> {user.website}
                    </div>
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>🏢 Company</h3>
                  <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                      <strong>Company:</strong> {user.company.name}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Catch Phrase:</strong> {user.company.catchPhrase}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Business:</strong> {user.company.bs}
                    </div>
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>📍 Address</h3>
                  <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                      <strong>Street:</strong> {user.address.street}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Suite:</strong> {user.address.suite}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>City:</strong> {user.address.city}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Zipcode:</strong> {user.address.zipcode}
                    </div>
                    <div style={styles.infoItem}>
                      <strong>Coordinates:</strong> {user.address.geo.lat},{" "}
                      {user.address.geo.lng}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "posts" && (
              <div style={styles.postsContent}>
                <h3 style={styles.sectionTitle}>📝 Posts by {user.name}</h3>
                {posts.length === 0 ? (
                  <p style={styles.emptyText}>No posts found for this user.</p>
                ) : (
                  <div style={styles.postsList}>
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} style={styles.postCard}>
                        <h4 style={styles.postTitle}>{post.title}</h4>
                        <p style={styles.postBody}>
                          {post.body.length > 200
                            ? `${post.body.substring(0, 200)}...`
                            : post.body}
                        </p>
                        <div style={styles.postMeta}>
                          <span style={styles.postId}>Post #{post.id}</span>
                          <Link
                            href={`/posts/${post.id}`}
                            style={styles.readMore}
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "albums" && (
              <div style={styles.albumsContent}>
                <h3 style={styles.sectionTitle}>📸 Albums by {user.name}</h3>
                {albums.length === 0 ? (
                  <p style={styles.emptyText}>No albums found for this user.</p>
                ) : (
                  <div style={styles.albumsGrid}>
                    {albums.slice(0, 6).map((album) => (
                      <div key={album.id} style={styles.albumCard}>
                        <div style={styles.albumImage}>
                          <Image
                            src={`https://picsum.photos/300/200?random=${album.id}`}
                            alt={album.title}
                            width={300}
                            height={200}
                            style={styles.albumCover}
                          />
                        </div>
                        <div style={styles.albumInfo}>
                          <h4 style={styles.albumTitle}>{album.title}</h4>
                          <Link
                            href={`/albums/${album.id}`}
                            style={styles.viewAlbum}
                          >
                            View Album →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    marginBottom: "2rem",
  },
  backButton: {
    display: "inline-block",
    color: "#6b7280",
    textDecoration: "none",
    marginBottom: "1rem",
    fontSize: "1rem",
    transition: "color 0.3s ease",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    margin: 0,
  },
  content: {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  userCard: {
    padding: "2rem",
  },
  userHeader: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #e5e7eb",
  },
  avatar: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  userBasicInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  userUsername: {
    color: "#6b7280",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  userEmail: {
    color: "#3b82f6",
    fontSize: "1rem",
    marginBottom: "0.5rem",
  },
  userWebsite: {
    color: "#059669",
    fontSize: "1rem",
  },
  tabNavigation: {
    display: "flex",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "2rem",
  },
  tab: {
    padding: "1rem 2rem",
    textDecoration: "none",
    color: "#6b7280",
    borderBottom: "3px solid transparent",
    transition: "all 0.3s ease",
    fontWeight: "500",
  },
  activeTab: {
    color: "#3b82f6",
    borderBottomColor: "#3b82f6",
  },
  tabContent: {
    minHeight: "300px",
  },
  detailsContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  section: {
    backgroundColor: "#f9fafb",
    padding: "1.5rem",
    borderRadius: "12px",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  infoGrid: {
    display: "grid",
    gap: "0.75rem",
  },
  infoItem: {
    color: "#374151",
    fontSize: "1rem",
  },
  postsContent: {
    padding: "1rem 0",
  },
  postsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  postCard: {
    backgroundColor: "#f9fafb",
    padding: "1.5rem",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  postTitle: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.75rem",
  },
  postBody: {
    color: "#6b7280",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    marginBottom: "1rem",
  },
  postMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postId: {
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
  readMore: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  albumsContent: {
    padding: "1rem 0",
  },
  albumsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  albumCard: {
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  albumImage: {
    height: "150px",
    overflow: "hidden",
  },
  albumCover: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  albumInfo: {
    padding: "1rem",
  },
  albumTitle: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  viewAlbum: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: "1rem",
    textAlign: "center",
    padding: "2rem",
  },
};
