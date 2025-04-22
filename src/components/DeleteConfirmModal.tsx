import { Button } from '@/components/ui/button';
import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  keyName: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  keyName
}) => {
  if (!isOpen) return null;

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
            Delete API Key
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Are you sure you want to delete the API key &quot;{keyName}&quot;? This action cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 flex justify-end gap-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-5 py-2 text-gray-900 dark:text-gray-100 border-gray-400 dark:border-gray-500"
            tabIndex={0}
            aria-label="Cancel deleting API key"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="px-5 py-2"
            tabIndex={0}
            aria-label="Confirm deleting API key"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}; 