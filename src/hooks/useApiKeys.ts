import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  createdAt: string;
  lastUsed?: string;
};

// Helper function to convert API response to our frontend format
const mapApiKeyResponse = (record: {
  id: string;
  name: string;
  value: string;
  usage: number;
  created_at: string;
  last_used?: string | null;
  type?: 'dev' | 'prod';
}): ApiKey => ({
  id: record.id,
  name: record.name,
  key: record.value,
  type: record.type || 'dev',
  usage: record.usage,
  createdAt: record.created_at,
  lastUsed: record.last_used || undefined,
});

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  // Fetch API keys on mount or when session changes
  useEffect(() => {
    const fetchApiKeys = async () => {
      // Only proceed if user is authenticated
      if (status !== 'authenticated' || !session) {
        setApiKeys([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await fetch('/api/api-keys', {
          headers: {
            Authorization: `Bearer ${session.user?.id || ''}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setApiKeys(data.map(mapApiKeyResponse));
        setError(null);
      } catch (err) {
        console.error('Error fetching API keys:', err);
        setError('Failed to load API keys');
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, [session, status]);

  const createApiKey = useCallback(async (name: string, type: 'dev' | 'prod' = 'dev') => {
    if (status !== 'authenticated' || !session) {
      setError('You must be signed in to create an API key');
      return null;
    }

    try {
      setLoading(true);
      
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user?.id || ''}`,
        },
        body: JSON.stringify({ name, type }),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const createdKey = await response.json();
      
      setApiKeys(prev => [mapApiKeyResponse(createdKey), ...prev]);
      setError(null);
      
      return mapApiKeyResponse(createdKey);
    } catch (err) {
      console.error('Error creating API key:', err);
      setError('Failed to create API key');
      return null;
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  const deleteApiKey = useCallback(async (id: string) => {
    if (status !== 'authenticated' || !session) {
      setError('You must be signed in to delete an API key');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.user?.id || ''}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      setApiKeys(prev => prev.filter(key => key.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting API key:', err);
      setError('Failed to delete API key');
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  const updateApiKey = useCallback(async (id: string, updates: Partial<Omit<ApiKey, 'id' | 'key' | 'createdAt' | 'type'>>) => {
    if (status !== 'authenticated' || !session) {
      setError('You must be signed in to update an API key');
      return;
    }

    try {
      setLoading(true);
      
      // Convert frontend format to API format
      const apiUpdates = {
        ...(updates.name && { name: updates.name }),
        ...(updates.usage !== undefined && { usage: updates.usage }),
        ...(updates.lastUsed && { lastUsed: updates.lastUsed }),
      };
      
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.user?.id || ''}`,
        },
        body: JSON.stringify(apiUpdates),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const updatedKey = await response.json();
      
      setApiKeys(prev => 
        prev.map(key => 
          key.id === id 
            ? mapApiKeyResponse(updatedKey)
            : key
        )
      );
      setError(null);
    } catch (err) {
      console.error('Error updating API key:', err);
      setError('Failed to update API key');
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  const getApiKey = useCallback(async (id: string) => {
    if (status !== 'authenticated' || !session) {
      setError('You must be signed in to get an API key');
      return null;
    }

    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        headers: {
          Authorization: `Bearer ${session.user?.id || ''}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return mapApiKeyResponse(data);
    } catch (err) {
      console.error('Error getting API key:', err);
      setError('Failed to get API key');
      return null;
    }
  }, [session, status]);

  return {
    apiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKey,
    getApiKey,
    loading,
    error
  };
}; 