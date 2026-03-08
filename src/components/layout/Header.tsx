/**
 * @file components/layout/Header.tsx
 * @description Persistent navigation header displayed across all dashboard pages.
 * Contains the company logo (theme-aware), the app name, a theme toggle button,
 * and a user profile dropdown with a sign-out option. The header is sticky-positioned
 * at the top of the viewport so it remains visible during scrolling.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import Image from "next/image";

export function Header() {
  const router = useRouter();
  /** Controls visibility of the user profile dropdown menu */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Handles user sign-out by redirecting to the login page.
   * In a production application, this would also clear session tokens,
   * cookies, or authentication state before redirecting.
   */
  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0e213d] flex items-center justify-between px-6 sticky top-0 z-40 transition-colors duration-100">
      
      {/* Left section: Logo + App name — links back to the dashboard home */}
      <Link href="/dashboard" className="flex items-center space-x-3 group">
        <div className="relative w-8 h-8 transition-transform duration-100">
          {/* Dark logo variant — visible only in light theme (hidden via dark:hidden) */}
          <Image
            src="/images/icon_dark.png"
            alt="Attimo Logo"
            fill
            className="object-contain block dark:hidden"
            priority
          />
          {/* Light logo variant — visible only in dark theme (hidden by default, shown via dark:block) */}
          <Image
            src="/images/icon_light.png"
            alt="Attimo Logo"
            fill
            className="object-contain hidden dark:block"
            priority
          />
        </div>
        <span className="font-semibold text-brand-dark dark:text-brand-light text-lg tracking-tight">
          Attimo Support
        </span>
      </Link>

      {/* Right section: Theme toggle + User profile menu */}
      <div className="flex items-center space-x-4">
        {/* Dark/light mode toggle button */}
        <ThemeToggle />
        
        {/* User profile dropdown menu */}
        <div className="relative">
          {/* Profile avatar button — toggles dropdown visibility */}
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-sm font-semibold text-brand-dark dark:text-brand-light hover:bg-gray-200 dark:hover:bg-white/20 transition-colors focus:outline-none"
          >
            {/* User silhouette icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>

          {/* Dropdown menu — rendered conditionally when isDropdownOpen is true */}
          {isDropdownOpen && (
            <>
              {/* Invisible full-screen overlay to close dropdown on outside click */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsDropdownOpen(false)}
              />
              {/* Dropdown card positioned below the avatar button */}
              <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-[#0e213d] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 py-1 z-50">
                
                {/* User info section showing the display name */}
                <div className="px-4 py-2 border-b border-gray-100 dark:border-white/10 mb-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p> 
                </div>
                
                {/* Sign out button */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors flex items-center"
                >
                  {/* Logout / exit icon */}
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}