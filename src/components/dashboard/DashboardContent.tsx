import { ApiKeysSection } from "./ApiKeysSection";
import { DashboardHeader } from "./DashboardHeader";
import { ExpertSection } from "./ExpertSection";
import { UsageCard } from "./UsageCard";

export const DashboardContent = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <DashboardHeader />

      <main className="flex-1 overflow-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        </div>

        <UsageCard />
        <ApiKeysSection />
        <ExpertSection />
      </main>
    </div>
  );
}; 