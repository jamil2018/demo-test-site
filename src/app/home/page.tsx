"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn, getUserEmail, clearSession } from "@/utils/session";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      router.push("/login");
    } else {
      const email = getUserEmail();
      setUserEmail(email || "");
    }
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Demo App</h1>
        </div>
        <div className="flex-none">
          <button
            onClick={handleLogout}
            className="btn btn-ghost"
            data-test-id="logout-button"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold text-primary mb-4"
              data-test-id="home-page-title"
            >
              Welcome to Home Page
            </h1>
            <p
              className="text-lg text-base-content/70"
              data-test-id="home-page-description"
            >
              This is the home page of the demo application
            </p>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <h2
                className="card-title text-2xl justify-center mb-4"
                data-test-id="home-page-hello"
              >
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
