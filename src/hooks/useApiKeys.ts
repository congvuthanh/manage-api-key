import { ApiKeyRecord, supabase } from '@/lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  type: 'dev' | 'prod';
  usage: number;
  createdAt: string;
  lastUsed?: string;
};

// Helper function to convert Supabase record to our frontend format
const mapApiKeyRecord = (record: ApiKeyRecord): ApiKey => ({
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

  // Fetch API keys on mount
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setApiKeys(data.map(mapApiKeyRecord));
        setError(null);
      } catch (err) {
        console.error('Error fetching API keys:', err);
        setError('Failed to load API keys');
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const createApiKey = useCallback(async (name: string, type: 'dev' | 'prod' = 'dev') => {
    try {
      setLoading(true);
      
      const prefix = type === 'dev' ? 'tvly-dev-' : 'tvly-prod-';
      const randomString = Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
      
      const newKeyId = uuidv4();
      const newApiKey = {
        id: newKeyId,
        name,
        value: `${prefix}${randomString}`,
        usage: 0,
        created_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('api_keys')
        .insert(newApiKey);
      
      if (error) throw error;
      
      // Fetch the newly created key to ensure we have the correct data
      const { data: createdKey, error: fetchError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', newKeyId)
        .single();
      
      if (fetchError) throw fetchError;
      
      setApiKeys(prev => [mapApiKeyRecord(createdKey), ...prev]);
      setError(null);
      
      return mapApiKeyRecord(createdKey);
    } catch (err) {
      console.error('Error creating API key:', err);
      setError('Failed to create API key');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteApiKey = useCallback(async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setApiKeys(prev => prev.filter(key => key.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting API key:', err);
      setError('Failed to delete API key');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateApiKey = useCallback(async (id: string, updates: Partial<Omit<ApiKey, 'id' | 'key' | 'createdAt' | 'type'>>) => {
    try {
      setLoading(true);
      
      // Convert frontend format to Supabase format
      const supabaseUpdates: Partial<ApiKeyRecord> = {
        ...(updates.name && { name: updates.name }),
        ...(updates.usage !== undefined && { usage: updates.usage }),
        ...(updates.lastUsed && { last_used: updates.lastUsed }),
      };
      
      const { error } = await supabase
        .from('api_keys')
        .update(supabaseUpdates)
        .eq('id', id);
      
      if (error) throw error;
      
      // Fetch the updated key to ensure we have the correct data
      const { data: updatedKey, error: fetchError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      setApiKeys(prev => 
        prev.map(key => 
          key.id === id 
            ? mapApiKeyRecord(updatedKey)
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
  }, []);

  const getApiKey = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return mapApiKeyRecord(data);
    } catch (err) {
      console.error('Error getting API key:', err);
      setError('Failed to get API key');
      return null;
    }
  }, []);

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