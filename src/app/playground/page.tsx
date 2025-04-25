"use client";

import { useNotification } from "@/components/Notification";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { useState } from "react";

export default function APIPlayground() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const [apiKey, setApiKey] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState<string>("");
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      showNotification("Please enter an API key", "error");
      return;
    }

    if (!githubUrl.trim()) {
      showNotification("Please enter a GitHub repository URL", "error");
      return;
    }

    setIsLoading(true);
    setJsonResponse("");

    try {
      const response = await fetch("/api/github-summarizer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        body: JSON.stringify({ githubUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch summary");
      }

      const data = await response.json();

      // Format the JSON with proper indentation
      setJsonResponse(JSON.stringify(data, null, 2));

      showNotification("Successfully fetched repository data", "success");
    } catch (error) {
      console.error("Error fetching GitHub summary:", error);
      showNotification(error instanceof Error ? error.message : "An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} activePath="/playground" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">GitHub Repository Summarizer</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Summarize a GitHub Repository</h2>

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
                  Enter your Tavily API key to access the GitHub summarizer.
                </p>
              </div>

              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub Repository URL
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Enter a GitHub repository URL to summarize its README and details.
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
                      Summarizing...
                    </>
                  ) : (
                    "Summarize Repository"
                  )}
                </Button>
              </div>
            </form>

            {jsonResponse && (
              <div className="mt-8 bg-gray-50 dark:bg-gray-850 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white">API Response</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(jsonResponse);
                      showNotification("Copied to clipboard", "success");
                    }}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-1 px-3 rounded text-xs"
                    aria-label="Copy JSON to clipboard"
                  >
                    Copy JSON
                  </button>
                </div>
                <pre className="p-4 bg-gray-900 rounded-b-lg overflow-x-auto text-green-400 text-sm font-mono">
                  {jsonResponse}
                </pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 