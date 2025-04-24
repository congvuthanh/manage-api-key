"use client";

import { useNotification } from "@/components/Notification";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function APIPlayground() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      showNotification("Please enter an API key", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Wait a bit to show loading state before redirect
      await new Promise(resolve => setTimeout(resolve, 300));

      // Redirect to the protected page with the API key as a query parameter
      router.push(`/protected?key=${encodeURIComponent(apiKey)}`);

      // Note: we don't reset isLoading here because we're navigating away
    } catch (error) {
      console.error("Error submitting API key:", error);
      showNotification("An unexpected error occurred", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} activePath="/playground" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">API Playground</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Enter your API Key</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="tvly-dev-xxxxxxxx"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter your Tavily API key to access protected resources.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="px-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
} 