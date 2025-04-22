"use client";

import { ApiKeyDetail } from "@/components/ApiKeyDetail";
import { ApiKeyList } from "@/components/ApiKeyList";
import { CreateApiKeyModal } from "@/components/CreateApiKeyModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { EditApiKeyModal } from "@/components/EditApiKeyModal";
import { useNotification } from "@/components/Notification";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ApiKey, useApiKeys } from "@/hooks/useApiKeys";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ApiKeysDashboard() {
  const { apiKeys, createApiKey, deleteApiKey, updateApiKey, loading, error } = useApiKeys();
  const { showNotification } = useNotification();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [keyToEdit, setKeyToEdit] = useState<ApiKey | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const handleCreateKey = async (name: string, type: 'dev' | 'prod') => {
    if (!name.trim()) return;
    const newKey = await createApiKey(name, type);
    if (newKey) {
      showNotification(`API key "${name}" created successfully`);
      setShowCreateModal(false);
    }
  };

  const handleDeleteKey = (id: string) => {
    setKeyToDelete(id);
    setShowDetailModal(false);
  };

  const confirmDeleteKey = async () => {
    if (keyToDelete) {
      const keyName = apiKeys.find(k => k.id === keyToDelete)?.name || 'API key';
      await deleteApiKey(keyToDelete);
      showNotification(`"${keyName}" deleted successfully`, 'error');

      if (selectedKey?.id === keyToDelete) {
        setSelectedKey(null);
      }
      setKeyToDelete(null);
    }
  };

  const handleKeyClick = (key: ApiKey) => {
    setSelectedKey(key);
  };

  const handleKeyDoubleClick = (key: ApiKey) => {
    setSelectedKey(key);
    setShowDetailModal(true);
  };

  const handleEditKey = (key: ApiKey) => {
    setKeyToEdit(key);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (id: string, name: string) => {
    await updateApiKey(id, { name });
    showNotification(`API key "${name}" updated successfully`);

    // Update selected key if it was the one edited
    if (selectedKey?.id === id) {
      const updated = { ...selectedKey, name };
      setSelectedKey(updated);
    }

    setShowEditModal(false);
    setKeyToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center" aria-label="Home">
              <span className="text-xl font-semibold text-gray-900 dark:text-white">Your App</span>
            </Link>
            <nav className="flex space-x-1">
              <Link
                href="/dashboards"
                className="text-gray-900 dark:text-white font-medium px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700"
              >
                Overview
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </button>
              <button
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </button>
              <button
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
            <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Toggle theme">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        </div>

        {/* Gradient Usage Card */}
        <div className="mb-8 rounded-lg overflow-hidden bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500 p-1">
          <div className="rounded-lg p-6 text-white relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="text-sm font-medium mb-1 opacity-90">CURRENT PLAN</div>
                <h2 className="text-4xl font-bold">Developer</h2>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Manage Plan
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">API Usage</h3>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div className="text-sm mb-2">Plan</div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-1">
                <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="flex justify-end text-sm">0 / 1,000 Credits</div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-10 h-6 rounded-full bg-white/20 flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-sm">Pay as you go</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h2>
            <Button
              onClick={() => setShowCreateModal(true)}
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
                onClick={() => setShowCreateModal(true)}
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
              onEditKey={handleEditKey}
              onKeyDoubleClick={handleKeyDoubleClick}
            />
          )}
        </div>
      </main>

      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateApiKey={handleCreateKey}
      />

      <EditApiKeyModal
        isOpen={showEditModal}
        apiKey={keyToEdit}
        onClose={() => {
          setShowEditModal(false);
          setKeyToEdit(null);
        }}
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
                onClick={() => setShowDetailModal(false)}
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
          onClose={() => setKeyToDelete(null)}
          onConfirm={confirmDeleteKey}
          keyName={apiKeys.find(k => k.id === keyToDelete)?.name || 'this API key'}
        />
      )}
    </div>
  );
} 