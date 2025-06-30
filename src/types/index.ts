export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  bio: string;
  profileImage: string;
  location: string;
  role: "user" | "admin";
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  password?: string;
}

export interface Diary {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  images: string[];
  location: string;
  weatherAtTime?: any;
  isPublic: boolean;
  likes: number;
  authorId: string;
  author?: User;
  createdAt: Date;
  updatedAt?: Date;
  weather?: {
    condition: string;
    temperature: number;
    location: string;
  };
}

export interface AuthResponse {
  message: string;
  uid: string;
  email: string;
  name: string;
  token?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export interface CreateDiaryData {
  title: string;
  content: string;
  coverImage?: string;
  images?: string[];
  location?: string;
  weatherAtTime?: any;
  isPublic?: boolean;
  authorId: string;
}
