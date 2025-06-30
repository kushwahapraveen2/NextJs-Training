"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import ProtectedRoute from "../../../../components/auth/ProtectedRoute";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner";
import { Diary } from "../../../../types";

export default function EditDiary() {
  const params = useParams();
  const id =
    params && typeof params.id === "string"
      ? params.id
      : Array.isArray(params?.id)
      ? params.id[0]
      : "";
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    coverImage: "",
    location: "",
    isPublic: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/diary/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch diary");
        }
        const data = await res.json();
        setForm(data);
      } catch (error: any) {
        setError(error.message || "Failed to load diary");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchDiary();
  }, [id]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/diary/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update diary");
      }

      router.push("/diary");
    } catch (error: any) {
      setError(error.message || "Failed to update diary");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex justify-center items-center min-h-96">
            <LoadingSpinner size="lg" text="Loading diary..." />
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {error}
            </h2>
            <Button onClick={() => router.push("/diary")} variant="primary">
              Back to Diaries
            </Button>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div style={styles.container}>
          <div style={styles.header}>
            <Button
              onClick={() => router.push(`/diary/${id}`)}
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
            >
              ← Back to Diary
            </Button>
            <h1 style={styles.title}>✏️ Edit Diary</h1>
          </div>

          <div style={styles.content}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <Input
                value={form.title}
                onChange={(value) => handleChange("title", value)}
                placeholder="Title"
                required
              />
              <textarea
                name="content"
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Content"
                required
                rows={6}
                style={styles.textarea}
              />
              <Input
                value={form.coverImage}
                onChange={(value) => handleChange("coverImage", value)}
                placeholder="Cover Image URL"
              />
              <Input
                value={form.location}
                onChange={(value) => handleChange("location", value)}
                placeholder="Location"
              />
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={form.isPublic}
                  onChange={(e) => handleChange("isPublic", e.target.checked)}
                  style={styles.checkbox}
                />
                Make Public
              </label>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Saving...
                  </>
                ) : (
                  "💾 Save Changes"
                )}
              </Button>
            </form>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  navbar: {
    backgroundColor: "#333",
    padding: "1rem 2rem",
    color: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.4rem",
  },
  content: {
    padding: "2rem",
    maxWidth: "700px",
    margin: "auto",
    backgroundColor: "#fff",
    marginTop: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
  },
  checkbox: {
    width: "18px",
    height: "18px",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    padding: "0.8rem 1.2rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
