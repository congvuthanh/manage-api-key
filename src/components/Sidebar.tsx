"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activePath?: string;
}

export function Sidebar({ isCollapsed, onToggle, activePath = "/dashboards" }: SidebarProps) {
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Helper function to determine if a path is active
  const isActive = (path: string) => activePath === path;

  // Add window resize listener to detect mobile screens
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
      {/* Mobile overlay - shown when sidebar is open on mobile */}
      {!isCollapsed && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <aside
        className={`${isCollapsed ? 'w-0 md:w-16' : 'w-64 md:w-56'} 
                   min-h-screen border-r border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 
                   fixed md:static z-40 h-full overflow-y-auto`}
      >
        {/* Toggle button - with simplified positioning */}
        <div className="relative">
          <button
            onClick={onToggle}
            className="absolute top-4 -right-3 bg-white dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700 rounded-full p-1 shadow-md z-50"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transform transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Mobile toggle button - only shown when sidebar is collapsed on mobile */}
        {isCollapsed && isMobile && (
          <button
            onClick={onToggle}
            className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 
                     dark:border-gray-700 rounded-full p-1 shadow-md"
            aria-label="Expand sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}

        {/* Hide all content when fully collapsed on mobile */}
        {(!isCollapsed || !isMobile) && (
          <>
            {/* Logo */}
            <div className={`p-6 ${isCollapsed && !isMobile ? 'flex justify-center' : ''}`}>
              <Link href="/" className="flex items-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M7.0835 19.9998L14.1668 26.4998L3.3335 29.6665L7.0835 19.9998Z" fill="#4285F4" />
                  <path d="M23.6168 14.2498L29.6668 17.9165L24.6668 28.6665L18.6168 24.9998L23.6168 14.2498Z" fill="#EA4335" />
                  <path d="M11.5835 3.33317L22.3335 8.33317L17.3335 19.9998L6.5835 14.9998L11.5835 3.33317Z" fill="#FBBC05" />
                </svg>
                {(!isCollapsed || isMobile) && (
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">tavily</span>
                )}
              </Link>
            </div>

            {/* Personal section with avatar */}
            {(!isCollapsed || isMobile) ? (
              <div className="mx-4 mb-6 p-2 bg-blue-50 dark:bg-gray-700 rounded-md flex items-center">
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                    Vu
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">Personal</span>
                </div>
                <button
                  className="ml-auto"
                  aria-label="Toggle account options"
                  tabIndex={0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex justify-center mb-6">
                <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  Vu
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1">
              <ul className={`space-y-1 ${isCollapsed && !isMobile ? 'px-2' : 'px-3'}`}>
                <li>
                  <Link
                    href="/dashboards"
                    className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                      ${isActive('/dashboards')
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    title={isCollapsed && !isMobile ? "Overview" : ""}
                    tabIndex={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${isCollapsed && !isMobile ? '' : 'mr-3'} ${isActive('/dashboards') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    {(!isCollapsed || isMobile) && "Overview"}
                  </Link>
                </li>

                {/* Rest of the navigation items follow the same pattern */}
                <li>
                  <Link
                    href="/playground"
                    className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                      ${isActive('/playground')
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    title={isCollapsed && !isMobile ? "API Playground" : ""}
                    tabIndex={0}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${isCollapsed && !isMobile ? '' : 'mr-3'} ${isActive('/playground') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    {(!isCollapsed || isMobile) && "API Playground"}
                  </Link>
                </li>

                {/* Continue with the rest of your navigation links following the same pattern */}

                {/* My Account section */}
                {(!isCollapsed || isMobile) ? (
                  <li>
                    <button
                      onClick={() => setAccountExpanded(!accountExpanded)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      tabIndex={0}
                      aria-expanded={accountExpanded}
                      aria-label="Toggle account menu"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-500">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        My Account
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-gray-500 transition-transform ${accountExpanded ? 'rotate-180' : ''}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {accountExpanded && (
                      <ul className="mt-1 pl-10 space-y-1">
                        <li>
                          <Link
                            href="/account/profile"
                            className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            tabIndex={0}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/account/settings"
                            className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            tabIndex={0}
                          >
                            Settings
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li>
                    <Link
                      href="/account"
                      className={`flex justify-center items-center px-3 py-2 text-sm font-medium rounded-md 
                        ${isActive('/account')
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      title="My Account"
                      tabIndex={0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isActive('/account') ? 'text-blue-600 dark:text-blue-400' : ''}
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Sidebar footer */}
            <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
              <a
                href="https://github.com/user/univer-github-analyzer"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200`}
                tabIndex={0}
                aria-label="View project on GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isCollapsed && !isMobile ? '' : 'mr-2'}
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                {(!isCollapsed || isMobile) && "GitHub"}
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
} 