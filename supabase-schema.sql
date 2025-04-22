-- Create or modify the api_keys table with the correct schema
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  value TEXT NOT NULL,  -- This is the API key value
  usage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_api_keys_id ON api_keys(id);
CREATE INDEX IF NOT EXISTS idx_api_keys_value ON api_keys(value); 