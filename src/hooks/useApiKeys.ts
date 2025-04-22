import { useCallback, useState } from 'react';

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  createdAt: string;
  lastUsed?: string;
};

// In a real application, these operations would interact with a backend API
export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Default",
      key: "tvly-dev-123456789abcdefghijklmnopqrstuvwxyz123456",
      type: "dev",
      usage: 0,
      createdAt: "2023-05-15T10:30:00Z",
      lastUsed: "2023-06-01T15:45:00Z",
    }
  ]);

  const createApiKey = useCallback((name: string, type: 'dev' | 'prod' = 'dev') => {
    const prefix = type === 'dev' ? 'tvly-dev-' : 'tvly-prod-';
    const randomString = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
    
    const newKey: ApiKey = {
      id: `${Date.now()}`,
      name,
      key: `${prefix}${randomString}`,
      type,
      usage: 0,
      createdAt: new Date().toISOString(),
    };
    
    setApiKeys(prev => [...prev, newKey]);
    return newKey;
  }, []);

  const deleteApiKey = useCallback((id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
  }, []);

  const updateApiKey = useCallback((id: string, updates: Partial<Omit<ApiKey, 'id' | 'key' | 'createdAt' | 'type'>>) => {
    setApiKeys(prev => 
      prev.map(key => 
        key.id === id 
          ? { ...key, ...updates } 
          : key
      )
    );
  }, []);

  const getApiKey = useCallback((id: string) => {
    return apiKeys.find(key => key.id === id) || null;
  }, [apiKeys]);

  return {
    apiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey,
    getApiKey
  };
}; 