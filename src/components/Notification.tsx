"use client";

import * as React from 'react';

type NotificationType = 'success' | 'error' | 'info';

type NotificationData = {
  message: string;
  type: NotificationType;
  visible: boolean;
};

type NotificationContextType = {
  notification: NotificationData;
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
};

const defaultNotification: NotificationData = {
  message: '',
  type: 'success',
  visible: false
};

const NotificationContext = React.createContext<NotificationContextType>({
  notification: defaultNotification,
  showNotification: () => { },
  hideNotification: () => { }
});

export function useNotification() {
  return React.useContext(NotificationContext);
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = React.useState<NotificationData>(defaultNotification);

  function showNotification(message: string, type: NotificationType = 'success') {
    setNotification({
      message,
      type,
      visible: true
    });

    // Auto-hide notification after 3 seconds
    setTimeout(() => {
      hideNotification();
    }, 3000);
  }

  function hideNotification() {
    setNotification(prev => ({ ...prev, visible: false }));
  }

  // Get the appropriate icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get background color based on notification type
  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-green-600';
    }
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      {notification.visible && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${getBgColor()} text-white px-6 py-3 rounded shadow-lg z-50 flex items-center`}>
          {getIcon()}
          <span className="font-medium">{notification.message}</span>
          <button
            onClick={hideNotification}
            className="ml-4 hover:bg-white/20 rounded-full p-1"
            aria-label="Close notification"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
} 