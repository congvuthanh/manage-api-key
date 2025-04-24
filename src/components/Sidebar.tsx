"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activePath?: string;
}

export function Sidebar({ isCollapsed, onToggle, activePath = "/dashboards" }: SidebarProps) {
  const [accountExpanded, setAccountExpanded] = useState(false);

  // Helper function to determine if a path is active
  const isActive = (path: string) => activePath === path;

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-56'} min-h-screen border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 relative`}>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md z-10"
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
          className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Logo */}
      <div className={`p-6 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <Link href="/" className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <path d="M7.0835 19.9998L14.1668 26.4998L3.3335 29.6665L7.0835 19.9998Z" fill="#4285F4" />
            <path d="M23.6168 14.2498L29.6668 17.9165L24.6668 28.6665L18.6168 24.9998L23.6168 14.2498Z" fill="#EA4335" />
            <path d="M11.5835 3.33317L22.3335 8.33317L17.3335 19.9998L6.5835 14.9998L11.5835 3.33317Z" fill="#FBBC05" />
          </svg>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900 dark:text-white">tavily</span>
          )}
        </Link>
      </div>

      {/* Personal section with avatar */}
      {!isCollapsed ? (
        <div className="mx-4 mb-6 p-2 bg-blue-50 dark:bg-gray-700 rounded-md flex items-center">
          <div className="flex items-center">
            <div className="w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              Vu
            </div>
            <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">Personal</span>
          </div>
          <button className="ml-auto">
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
        <ul className={`space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          <li>
            <Link
              href="/dashboards"
              className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                ${isActive('/dashboards')
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              title={isCollapsed ? "Overview" : ""}
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
                className={`${isCollapsed ? '' : 'mr-3'} ${isActive('/dashboards') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              {!isCollapsed && "Overview"}
            </Link>
          </li>
          <li>
            <Link
              href="/playground"
              className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                ${isActive('/playground')
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              title={isCollapsed ? "API Playground" : ""}
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
                className={`${isCollapsed ? '' : 'mr-3'} ${isActive('/playground') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              {!isCollapsed && "API Playground"}
            </Link>
          </li>
          <li>
            <Link
              href="/use-cases"
              className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                ${isActive('/use-cases')
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              title={isCollapsed ? "Use Cases" : ""}
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
                className={`${isCollapsed ? '' : 'mr-3'} ${isActive('/use-cases') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {!isCollapsed && "Use Cases"}
            </Link>
          </li>
          {!isCollapsed ? (
            <li>
              <button
                onClick={() => setAccountExpanded(!accountExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    <Link href="/account/profile" className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/settings" className="block py-2 px-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
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
          <li>
            <Link
              href="/documentation"
              className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md 
                ${isActive('/documentation')
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              title={isCollapsed ? "Documentation" : ""}
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
                className={`${isCollapsed ? '' : 'mr-3'} ${isActive('/documentation') ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`}
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              {!isCollapsed && "Documentation"}
            </Link>
          </li>
        </ul>
      </nav>

      {/* User section at bottom */}
      {!isCollapsed ? (
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
              Vu
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Vu Cong</p>
            </div>
            <Link href="/account" className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <polyline points="9 10 4 15 9 20"></polyline>
                <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
            Vu
          </div>
        </div>
      )}
    </aside>
  );
} 