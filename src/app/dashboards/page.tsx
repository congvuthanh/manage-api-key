"use client";

import { ApiKeyDetail } from "@/components/ApiKeyDetail";
import { ApiKeyList } from "@/components/ApiKeyList";
import { CreateApiKeyModal } from "@/components/CreateApiKeyModal";
import { EditApiKeyModal } from "@/components/EditApiKeyModal";
import { ApiKey, useApiKeys } from "@/hooks/useApiKeys";
import Link from "next/link";
import { useState } from "react";

export default function ApiKeysDashboard() {
  const { apiKeys, createApiKey, deleteApiKey, updateApiKey } = useApiKeys();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [keyToEdit, setKeyToEdit] = useState<ApiKey | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const handleCreateKey = (name: string, type: 'dev' | 'prod') => {
    if (!name.trim()) return;
    createApiKey(name, type);
    setShowCreateModal(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeyToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteKey = () => {
    if (keyToDelete) {
      deleteApiKey(keyToDelete);
      if (selectedKey?.id === keyToDelete) {
        setSelectedKey(null);
        setShowDetailModal(false);
      }
      setShowDeleteModal(false);
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

  const handleSaveEdit = (id: string, name: string) => {
    updateApiKey(id, { name });

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
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1 rounded-md text-sm font-medium"
              tabIndex={0}
              aria-label="Create new API key"
            >
              <span className="inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create
              </span>
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            The key is used to authenticate your requests to the API. To learn more, see the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</a> page.
          </p>

          <ApiKeyList
            apiKeys={apiKeys}
            selectedKeyId={selectedKey?.id}
            onKeyClick={handleKeyClick}
            onDeleteKey={handleDeleteKey}
            onEditKey={handleEditKey}
            onKeyDoubleClick={handleKeyDoubleClick}
          />
        </div>
      </main>

      <CreateApiKeyModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateKey}
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
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Delete API Key
              </h3>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete this API key? This action cannot be undone.</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setKeyToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium"
                tabIndex={0}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteKey}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm font-medium"
                tabIndex={0}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 