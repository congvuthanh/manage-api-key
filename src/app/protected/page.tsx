"use client";

import { useNotification } from "@/components/Notification";
import { Sidebar } from "@/components/Sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/useSidebar";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function ProtectedContent() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const { showNotification } = useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [validating, setValidating] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [keyValue, setKeyValue] = useState<string>("");
  const [validated, setValidated] = useState(false);

  // Create a memoized version of validateKey to prevent unnecessary re-creation
  const validateKey = useCallback(async (key: string) => {
    if (validated) return; // Don't validate again if already done

    try {
      setValidating(true);

      // Call the API endpoint to validate the key
      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      });

      const result = await response.json();

      setIsValid(result.valid);
      setValidated(true);

      if (result.valid) {
        showNotification("Valid API key, /protected can be accessed", "success");
      } else {
        showNotification("Invalid API key", "error");
      }
    } catch (error) {
      console.error("Error validating API key:", error);
      showNotification("Error validating API key", "error");
      setIsValid(false);
    } finally {
      setValidating(false);
    }
  }, [showNotification, validated]);

  useEffect(() => {
    const key = searchParams.get("key");

    if (!key) {
      showNotification("No API key provided", "error");
      router.push("/playground");
      return;
    }

    setKeyValue(key);

    // Only validate if we haven't done so yet
    if (!validated) {
      validateKey(key);
    }
  }, [router, searchParams, validateKey, validated, showNotification]);

  const goBack = () => {
    router.push("/playground");
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} activePath="/playground" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Protected Page</h1>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Key Validation</h2>

            {validating ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
                <p className="text-lg text-gray-600 dark:text-gray-300">Validating your API key...</p>
              </div>
            ) : isValid ? (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
                  <AlertTitle className="text-green-800 dark:text-green-300 font-medium">Success!</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Your API key is valid. You now have access to protected resources.
                  </AlertDescription>
                </Alert>

                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Your API Key</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm break-all">
                    {keyValue}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={goBack}>
                    Back to Playground
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Alert variant="destructive">
                  <AlertTitle>Invalid API Key</AlertTitle>
                  <AlertDescription>
                    The API key you provided is invalid or has been revoked.
                  </AlertDescription>
                </Alert>

                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-800">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Provided API Key</h3>
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded font-mono text-sm break-all">
                    {keyValue}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={goBack}>
                    Try Again
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2">Loading...</span>
      </div>
    }>
      <ProtectedContent />
    </Suspense>
  );
} 