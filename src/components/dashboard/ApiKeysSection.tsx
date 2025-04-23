import { ApiKeyDetail } from "@/components/ApiKeyDetail";
import { ApiKeyList } from "@/components/ApiKeyList";
import { CreateApiKeyModal } from "@/components/CreateApiKeyModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { EditApiKeyModal } from "@/components/EditApiKeyModal";
import { useNotification } from "@/components/Notification";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useApiKeyContext } from "@/contexts/ApiKeyContext";
import { ApiKey } from "@/hooks/useApiKeys";
import { useApiKeyModals } from "@/hooks/useModals";
import { Loader2 } from "lucide-react";

export const ApiKeysSection = () => {
  const { apiKeys, createApiKey, deleteApiKey, updateApiKey, loading, error } = useApiKeyContext();
  const { showNotification } = useNotification();
  const {
    showCreateModal,
    showEditModal,
    showDetailModal,
    selectedKey,
    keyToEdit,
    keyToDelete,
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    setDeleteTarget,
    selectKey
  } = useApiKeyModals();

  const handleCreateKey = async (name: string, type: 'dev' | 'prod') => {
    if (!name.trim()) return;
    const newKey = await createApiKey(name, type);
    if (newKey) {
      showNotification(`API key "${name}" created successfully`);
      closeCreateModal();
    }
  };

  const handleDeleteKey = (id: string) => {
    setDeleteTarget(id);
    closeDetailModal();
  };

  const confirmDeleteKey = async () => {
    if (keyToDelete) {
      const keyName = apiKeys.find(k => k.id === keyToDelete)?.name || 'API key';
      await deleteApiKey(keyToDelete);
      showNotification(`"${keyName}" deleted successfully`, 'error');

      if (selectedKey?.id === keyToDelete) {
        selectKey(null as unknown as ApiKey);
      }
      setDeleteTarget(null);
    }
  };

  const handleKeyClick = (key: ApiKey) => {
    selectKey(key);
  };

  const handleKeyDoubleClick = (key: ApiKey) => {
    selectKey(key);
    openDetailModal(key);
  };

  const handleSaveEdit = async (id: string, name: string) => {
    await updateApiKey(id, { name });
    showNotification(`API key "${name}" updated successfully`);

    // Update selected key if it was the one edited
    if (selectedKey?.id === id) {
      const updated = { ...selectedKey, name };
      selectKey(updated);
    }

    closeEditModal();
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h2>
          <Button
            onClick={openCreateModal}
            className="flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Create API Key</span>
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-lg text-gray-500">Loading API keys...</span>
          </div>
        ) : apiKeys.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">No API Keys Found</h2>
            <p className="text-gray-600 mb-4">
              You haven&apos;t created any API keys yet. Create one to get started.
            </p>
            <Button
              onClick={openCreateModal}
              className="flex items-center gap-2 mx-auto"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Create API Key</span>
            </Button>
          </div>
        ) : (
          <ApiKeyList
            apiKeys={apiKeys}
            selectedKeyId={selectedKey?.id}
            onKeyClick={handleKeyClick}
            onDeleteKey={handleDeleteKey}
            onEditKey={openEditModal}
            onKeyDoubleClick={handleKeyDoubleClick}
          />
        )}
      </div>

      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        onCreateApiKey={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={showEditModal}
        apiKey={keyToEdit}
        onClose={closeEditModal}
        onSave={handleSaveEdit}
      />

      {/* API Key Detail Modal */}
      {showDetailModal && selectedKey && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                API Key Details
              </h3>
              <button
                onClick={closeDetailModal}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                tabIndex={0}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <ApiKeyDetail apiKey={selectedKey} />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {keyToDelete && (
        <DeleteConfirmModal
          isOpen={keyToDelete !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDeleteKey}
          keyName={apiKeys.find(k => k.id === keyToDelete)?.name || 'this API key'}
        />
      )}
    </>
  );
}; 