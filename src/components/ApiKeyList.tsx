import { ApiKey } from "@/hooks/useApiKeys";
import { useEffect, useState } from "react";
import { useNotification } from "./Notification";

type ApiKeyListProps = {
  apiKeys: ApiKey[];
  selectedKeyId?: string | null;
  onKeyClick: (key: ApiKey) => void;
  onDeleteKey: (id: string) => void;
  onEditKey: (key: ApiKey) => void;
  onKeyDoubleClick?: (key: ApiKey) => void;
};

export const ApiKeyList = ({
  apiKeys,
  selectedKeyId,
  onKeyClick,
  onDeleteKey,
  onEditKey,
  onKeyDoubleClick,
}: ApiKeyListProps) => {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);
  const { showNotification } = useNotification();

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

  const toggleKeyVisibility = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDoubleClick = (key: ApiKey, e: React.MouseEvent) => {
    e.preventDefault();
    if (onKeyDoubleClick) {
      onKeyDoubleClick(key);
    }
  };

  const handleCopyToClipboard = (text: string, keyName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(text);
      // Show notification using the global notification system
      showNotification('Copied API Key to clipboard', 'success');
    } catch (err) {
      console.error("Failed to copy text:", err);
      showNotification('Failed to copy API key', 'error');
    }
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

  if (apiKeys.length === 0) {
    return (
      <div className="text-center py-10 border dark:border-gray-700 rounded-md">
        <p className="text-gray-500 dark:text-gray-400">No API keys found. Create one to get started.</p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Mobile card view for small screens
  if (isMobile) {
    return (
      <div className="space-y-4">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            onClick={() => onKeyClick(key)}
            onDoubleClick={(e) => handleDoubleClick(key, e)}
            className={`p-4 border rounded-lg ${selectedKeyId === key.id ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
              } cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-400 mr-2" title="Active"></div>
                <h3 className="font-medium text-gray-900 dark:text-white">{key.name}</h3>
              </div>
              <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${key.type === 'prod'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                {key.type}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Key:</span>
                <div className="flex items-center">
                  <span className="font-mono mr-2">{visibleKeys[key.id] ? key.key : maskKey(key.key)}</span>
                  <button
                    onClick={(e) => toggleKeyVisibility(key.id, e)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 mr-1"
                    tabIndex={0}
                    aria-label={visibleKeys[key.id] ? `Hide ${key.name} key` : `Show ${key.name} key`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {visibleKeys[key.id] ? (
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
                    onClick={(e) => handleCopyToClipboard(key.key, key.name, e)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    tabIndex={0}
                    aria-label={`Copy ${key.name} key`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Usage:</span>
                <span className="text-gray-700 dark:text-gray-300">{key.usage}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Created:</span>
                <span className="text-gray-700 dark:text-gray-300">{formatDate(key.createdAt)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Last used:</span>
                <span className="text-gray-700 dark:text-gray-300">{formatDate(key.lastUsed)}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditKey(key);
                }}
                className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                tabIndex={0}
                aria-label={`Edit ${key.name}`}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteKey(key.id);
                }}
                className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                tabIndex={0}
                aria-label={`Delete ${key.name}`}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Desktop table view
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usage</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Key</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Options</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {apiKeys.map((key) => (
            <tr
              key={key.id}
              onClick={() => onKeyClick(key)}
              onDoubleClick={(e) => handleDoubleClick(key, e)}
              className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedKeyId === key.id ? 'bg-gray-50 dark:bg-gray-700' : ''} cursor-pointer`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-400 mr-2" title="Active"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{key.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Last used: {formatDate(key.lastUsed)}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${key.type === 'prod'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                  {key.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {key.usage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                {visibleKeys[key.id] ? key.key : maskKey(key.key)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-center">
                {formatDate(key.createdAt)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                <div className="flex justify-end items-center space-x-2">
                  <button
                    onClick={(e) => toggleKeyVisibility(key.id, e)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    tabIndex={0}
                    aria-label={visibleKeys[key.id] ? `Hide ${key.name} key` : `Show ${key.name} key`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {visibleKeys[key.id] ? (
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
                    onClick={(e) => handleCopyToClipboard(key.key, key.name, e)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    tabIndex={0}
                    aria-label={`Copy ${key.name} key`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditKey(key);
                    }}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    tabIndex={0}
                    aria-label={`Edit ${key.name}`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteKey(key.id);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    tabIndex={0}
                    aria-label={`Delete ${key.name}`}
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 