import { Button } from "@/components/ui/button";
import { useState } from "react";

type CreateApiKeyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateApiKey: (name: string, type: 'dev' | 'prod') => void;
};

export const CreateApiKeyModal = ({
  isOpen,
  onClose,
  onCreateApiKey,
}: CreateApiKeyModalProps) => {
  const [keyName, setKeyName] = useState("");
  const [keyType, setKeyType] = useState<'dev' | 'prod'>('dev');
  const [limitUsage, setLimitUsage] = useState(false);
  const [usageLimit, setUsageLimit] = useState("1000");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (!keyName.trim()) return;
    onCreateApiKey(keyName, keyType);
    setKeyName("");
    setKeyType('dev');
    setLimitUsage(false);
    setUsageLimit("1000");
  };

  const handleCancel = () => {
    setKeyName("");
    setKeyType('dev');
    setLimitUsage(false);
    setUsageLimit("1000");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-5">
          <h3
            id="modal-title"
            className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
          >
            Create a new API key
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter a name and limit for the new API key.
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="mb-5">
            <div className="flex items-baseline justify-between mb-1">
              <label
                htmlFor="keyName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Key Name
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                — A unique name to identify this key
              </span>
            </div>
            <input
              id="keyName"
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Key Name"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && keyName.trim()) {
                  handleSubmit();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
            />
          </div>

          <div className="mb-5">
            <div className="flex items-baseline justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Key Type
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                — Choose the environment for this key
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="prod-type"
                    type="radio"
                    name="key-type"
                    checked={keyType === 'prod'}
                    onChange={() => setKeyType('prod')}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="prod-type" className="text-sm font-medium text-gray-900 dark:text-white">
                    Production
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rate limited to 1,000 requests/minute</p>
                </div>
              </div>

              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="dev-type"
                    type="radio"
                    name="key-type"
                    checked={keyType === 'dev'}
                    onChange={() => setKeyType('dev')}
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="dev-type" className="text-sm font-medium text-gray-900 dark:text-white">
                    Development
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rate limited to 100 requests/minute</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-start mb-2">
              <div className="flex items-center h-5">
                <input
                  id="limitUsage"
                  type="checkbox"
                  checked={limitUsage}
                  onChange={() => setLimitUsage(!limitUsage)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                />
              </div>
              <label htmlFor="limitUsage" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Limit monthly usage*
              </label>
            </div>

            {limitUsage && (
              <input
                type="number"
                min="1"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
            )}

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end gap-3">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="px-5 py-2"
            tabIndex={0}
            aria-label="Cancel creating new API key"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-5 py-2"
            disabled={!keyName.trim()}
            tabIndex={0}
            aria-label="Create new API key"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}; 