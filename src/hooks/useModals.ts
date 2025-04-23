import { ApiKey } from '@/hooks/useApiKeys';
import { useState } from 'react';

export const useApiKeyModals = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [keyToEdit, setKeyToEdit] = useState<ApiKey | null>(null);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);

  const openCreateModal = () => setShowCreateModal(true);
  const closeCreateModal = () => setShowCreateModal(false);
  
  const openEditModal = (key: ApiKey) => {
    setKeyToEdit(key);
    setShowEditModal(true);
  };
  
  const closeEditModal = () => {
    setShowEditModal(false);
    setKeyToEdit(null);
  };
  
  const openDetailModal = (key: ApiKey) => {
    setSelectedKey(key);
    setShowDetailModal(true);
  };
  
  const closeDetailModal = () => setShowDetailModal(false);
  
  const setDeleteTarget = (id: string | null) => setKeyToDelete(id);
  
  const selectKey = (key: ApiKey) => setSelectedKey(key);
  
  return {
    // State
    showCreateModal,
    showEditModal,
    showDetailModal,
    selectedKey,
    keyToEdit,
    keyToDelete,
    
    // Actions
    openCreateModal,
    closeCreateModal,
    openEditModal,
    closeEditModal,
    openDetailModal,
    closeDetailModal,
    setDeleteTarget,
    selectKey
  };
}; 