"use client";

import { Sidebar } from "@/components/Sidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ApiKeyProvider } from "@/contexts/ApiKeyContext";
import { useSidebar } from "@/hooks/useSidebar";

export default function ApiKeysDashboard() {
  const { sidebarCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} activePath="/dashboards" />

      <ApiKeyProvider>
        <DashboardContent />
      </ApiKeyProvider>
    </div>
  );
} 