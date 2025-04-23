import { ApiKey, useApiKeys } from '@/hooks/useApiKeys';
import { createContext, ReactNode, useContext } from 'react';

type ApiKeyContextType = {
  apiKeys: ApiKey[];
  createApiKey: (name: string, type: 'dev' | 'prod') => Promise<ApiKey | null>;
  deleteApiKey: (id: string) => Promise<void>;
  updateApiKey: (id: string, updates: Partial<Omit<ApiKey, 'id' | 'key' | 'createdAt' | 'type'>>) => Promise<void>;
  getApiKey: (id: string) => Promise<ApiKey | null>;
  loading: boolean;
  error: string | null;
};

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const apiKeyUtils = useApiKeys();

  return (
    <ApiKeyContext.Provider value={apiKeyUtils}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKeyContext = () => {
  const context = useContext(ApiKeyContext);

  if (context === undefined) {
    throw new Error('useApiKeyContext must be used within an ApiKeyProvider');
  }

  return context;
}; 