"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { api } from "../../lib/api-client";
import { setCurrentUser, setAuthToken } from "../../lib/auth-utils";
import { User } from "../../types";

interface LoginResponse {
  uid: string;
  email: string;
  name?: string;
  token?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await api.post<LoginResponse>("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.uid) {
        const user: User = {
          id: response.uid,
          email: response.email,
          name: response.name || "",
          username: response.email.split("@")[0],
          mobileNumber: "",
          isEmailVerified: false,
          isMobileVerified: false,
          bio: "",
          profileImage: "",
          location: "",
          role: "user",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setCurrentUser(user);

        if (response.token) {
          setAuthToken(response.token);
        }

        router.push("/dashboard");
      } else {
        setErrors({ general: "Login failed" });
      }
    } catch (error: any) {
      setErrors({ general: error.message || "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Layout showHeader={false} showFooter={false}>
      <div style={styles.container}>
        <div style={styles.background}>
          <div style={styles.backgroundOverlay} />
          <div style={styles.floatingShapes}>
            <div style={styles.shape1}></div>
            <div style={styles.shape2}></div>
            <div style={styles.shape3}></div>
          </div>
        </div>

        <div style={styles.content}>
          <div style={styles.formContainer}>
            <div style={styles.header}>
              <div style={styles.logo}>
                <span style={styles.logoIcon}></span>
                <span style={styles.logoText}></span>
              </div>
              <h1 style={styles.title}>Welcome Back</h1>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {errors.general && (
                <div style={styles.errorAlert}>
                  <span style={styles.errorIcon}>⚠️</span>
                  {errors.general}
                </div>
              )}

              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(value) => handleInputChange("email", value)}
                label="Email Address"
                error={errors.email}
                required
                icon="📧"
                fullWidth
              />

              <div style={styles.passwordContainer}>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(value) => handleInputChange("password", value)}
                  label="Password"
                  error={errors.password}
                  required
                  icon="🔒"
                  fullWidth
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                fullWidth
                className="login-button"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div style={styles.signupPrompt}>
                <span style={styles.promptText}>
                  Don&apos;t have an account?
                </span>
                <Link href="/signup" style={styles.signupLink}>
                  Sign up here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.1)",
  },
  floatingShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shape1: {
    position: "absolute",
    top: "20%",
    left: "10%",
    width: "100px",
    height: "100px",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite",
  },
  shape2: {
    position: "absolute",
    top: "60%",
    right: "15%",
    width: "150px",
    height: "150px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "50%",
    animation: "float 8s ease-in-out infinite reverse",
  },
  shape3: {
    position: "absolute",
    bottom: "20%",
    left: "20%",
    width: "80px",
    height: "80px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    animation: "float 7s ease-in-out infinite",
  },
  content: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "450px",
    padding: "2rem",
  },
  formContainer: {
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "3rem 2rem",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  logoIcon: {
    fontSize: "2rem",
    marginRight: "0.5rem",
  },
  logoText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#6b7280",
    fontSize: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "12px",
    color: "#dc2626",
    fontSize: "0.875rem",
  },
  errorIcon: {
    fontSize: "1rem",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    zIndex: 2,
  },
  forgotPassword: {
    textAlign: "right",
  },
  forgotLink: {
    color: "#667eea",
    textDecoration: "none",
    fontSize: "0.875rem",
    fontWeight: "500",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "1rem 0",
  },
  dividerText: {
    color: "#9ca3af",
    fontSize: "0.875rem",
    padding: "0 1rem",
  },
  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    background: "white",
    color: "#374151",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  socialIcon: {
    fontSize: "1.1rem",
  },
  signupPrompt: {
    textAlign: "center",
    marginTop: "1rem",
  },
  promptText: {
    color: "#6b7280",
    fontSize: "0.875rem",
  },
  signupLink: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "0.25rem",
  },
};
