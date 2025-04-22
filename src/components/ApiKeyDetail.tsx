import { ApiKey } from "@/hooks/useApiKeys";
import { useState } from "react";

type ApiKeyDetailProps = {
  apiKey: ApiKey | null;
};

export const ApiKeyDetail = ({ apiKey }: ApiKeyDetailProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleCopy = async () => {
    if (!apiKey) return;

    try {
      await navigator.clipboard.writeText(apiKey.key);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const toggleKeyVisibility = () => {
    setShowKey(!showKey);
  };

  const maskKey = (key: string) => {
    try {
      if (!key) return '•••••••••••••••••••';
      const prefix = key.substring(0, Math.min(12, key.length));
      return `${prefix}${'•'.repeat(Math.min(20, 36 - prefix.length))}`;
    } catch (err) {
      console.error("Error masking key:", err);
      return '•••••••••••••••••••';
    }
  };

  if (!apiKey) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">Select an API key to view details</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{apiKey.name}</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">API Key</label>
        <div className="flex">
          <input
            type="text"
            readOnly
            value={showKey ? apiKey.key : maskKey(apiKey.key)}
            className="flex-1 bg-gray-100 dark:bg-gray-600 p-2 rounded-l-md text-sm text-gray-800 dark:text-gray-200 border-0 font-mono"
          />
          <button
            onClick={toggleKeyVisibility}
            className="bg-gray-200 dark:bg-gray-500 px-3 rounded-none hover:bg-gray-300 dark:hover:bg-gray-400"
            tabIndex={0}
            aria-label={showKey ? "Hide API key" : "Show API key"}
            title={showKey ? "Hide API key" : "Show API key"}
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showKey ? (
                <>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </>
              ) : (
                <>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </>
              )}
            </svg>
          </button>
          <button
            onClick={handleCopy}
            className="bg-gray-200 dark:bg-gray-500 px-3 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-400 relative"
            tabIndex={0}
            aria-label="Copy API key to clipboard"
            type="button"
          >
            {copySuccess ? "Copied!" : "Copy"}
            {copySuccess && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Created</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {apiKey?.createdAt ? new Date(apiKey.createdAt).toLocaleDateString() : 'Unknown'}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Last Used</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {apiKey?.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : 'Never'}
          </p>
        </div>
      </div>
    </div>
  );
}; 