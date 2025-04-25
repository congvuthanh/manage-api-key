"use client";

import { NotificationProvider } from "@/components/Notification";
import { Sidebar } from "@/components/Sidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import { useSidebar } from "@/hooks/useSidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApiKeysDashboard() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const { status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the dashboard
  if (status === "authenticated") {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} activePath="/dashboards" />

        <NotificationProvider>
          <ApiKeyProvider>
            <DashboardContent />
          </ApiKeyProvider>
        </NotificationProvider>
      </div>
    );
  }

  // Default empty return for unauthenticated (will redirect)
  return null;
} 