"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const email = sessionStorage.getItem("userEmail");

    if (isLoggedIn !== "true") {
      router.push("/login");
    } else {
      setUserEmail(email || "");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Demo App</h1>
        </div>
        <div className="flex-none">
          <button onClick={handleLogout} className="btn btn-ghost">
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Welcome to Home Page
            </h1>
            <p className="text-lg text-base-content/70">
              This is the home page of the demo application
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2 className="card-title text-2xl justify-center mb-4">
                Hello, {userEmail}!
              </h2>
              <p className="text-base-content/70 mb-6">
                You have successfully logged in to the demo application.
              </p>
              <div className="card-actions justify-center">
                <button
                  onClick={handleLogout}
                  className="btn btn-primary btn-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
