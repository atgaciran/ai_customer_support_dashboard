/**
 * @file app/login/page.tsx
 * @description Login page for the Attimo Support Dashboard.
 * Provides a simple email/password form with pre-filled demo credentials.
 * Authentication is simulated — the form submission triggers an 800ms loading
 * animation before redirecting to the dashboard. In a production app, this
 * would validate credentials against a backend authentication service.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  /** Controls the loading spinner state during simulated authentication */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form submission. Simulates an authentication delay (800ms)
   * before redirecting to the dashboard. In production, this would perform
   * real credential validation and session/token management.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network latency for a realistic UX feel
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-dvh bg-brand-light dark:bg-brand-dark flex flex-col justify-center items-center p-6 transition-colors duration-100">

      {/* Back to Home navigation link — fixed in the top-left corner */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors group"
      >
        {/* Left arrow icon */}
        <svg className="w-5 h-5 mr-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>
      
      {/* Login card container — centered with max-width, shadow, and border */}
      <div className="w-full max-w-md bg-white dark:bg-white/5 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 p-8">
        
        {/* Header area with welcome message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign in to access your support dashboard.
          </p>
        </div>

        {/* Login form with pre-filled demo credentials for easy testing */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              defaultValue="demo@attimo.com"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 focus:outline-none bg-transparent text-gray-900 dark:text-white transition-all"
            />
          </div>
          
          {/* Password input field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              defaultValue="shdfhkjhkjshdjfkhsjfdjkh.4546464654879dfg453s4d5f57s89df7"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 focus:outline-none bg-transparent text-gray-900 dark:text-white transition-all"
            />
          </div>

          {/* Submit button — shows a spinner during loading, otherwise shows "Sign In" */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-brand-dark dark:bg-brand-light text-brand-light dark:text-brand-dark rounded-xl font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark disabled:opacity-70 flex justify-center items-center"
          >
            {isLoading ? (
              /* SVG spinner animation shown during simulated authentication */
              <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}