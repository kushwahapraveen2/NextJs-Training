"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      router.push("/login");
    }
  }, [router]);
};
