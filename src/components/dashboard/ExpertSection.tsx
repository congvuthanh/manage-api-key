export const ExpertSection = () => {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-500">Tavily Expert</h3>
        <span className="text-xs text-gray-500">Powered by <span className="font-semibold">Tadata</span></span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Your expert is a specialized agent, always up to date with Tavily&apos;s latest documentation and best practices. To be used in AI-native IDEs to accurately implement and test Tavily tools within your application.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
        Get your Tavily Expert
      </button>
    </div>
  );
}; 