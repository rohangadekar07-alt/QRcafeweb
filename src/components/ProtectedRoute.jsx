"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children, roleNeeded }) {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
      router.push(`/login`);
    } else if (roleNeeded && role !== roleNeeded) {
        if (role === "admin") router.push("/admin/dashboard");
        else router.push("/chef/dashboard");
    } else {
      setIsAuth(true);
    }
  }, [router, roleNeeded]);

  if (!isAuth) return <div className="h-screen flex items-center justify-center bg-gray-50 text-gray-400">Authenticating...</div>;

  return children;
}
