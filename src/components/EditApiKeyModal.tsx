import { ApiKey } from "@/hooks/useApiKeys";
import { useEffect, useState } from "react";

type EditApiKeyModalProps = {
  isOpen: boolean;
  apiKey: ApiKey | null;
  onClose: () => void;
  onSave: (id: string, name: string) => void;
};

export const EditApiKeyModal = ({
  isOpen,
  apiKey,
  onClose,
  onSave,
}: EditApiKeyModalProps) => {
  const [keyName, setKeyName] = useState("");

  useEffect(() => {
    if (apiKey) {
      setKeyName(apiKey.name);
    }
  }, [apiKey]);

  if (!isOpen || !apiKey) {
    return null;
  }

  const handleSubmit = () => {
    if (!keyName.trim()) return;
    onSave(apiKey.id, keyName);
    setKeyName("");
  };

  const handleCancel = () => {
    setKeyName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3
            id="edit-modal-title"
            className="text-lg font-medium text-gray-900 dark:text-white"
          >
            Edit API key
          </h3>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label
              htmlFor="editKeyName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <input
              id="editKeyName"
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
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
            <label
              htmlFor="keyType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Type
            </label>
            <select
              id="keyType"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              disabled
              defaultValue="dev"
            >
              <option value="dev">Development</option>
              <option value="prod">Production</option>
            </select>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              The key type cannot be changed after creation.
            </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm"
            tabIndex={0}
            aria-label="Cancel editing API key"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            disabled={!keyName.trim() || keyName === apiKey.name}
            tabIndex={0}
            aria-label="Save API key changes"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}; 