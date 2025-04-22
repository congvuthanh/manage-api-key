# API Key Management - Supabase Setup Guide

## Schema Error Fix

If you're seeing the error: `"Could not find the 'api_key' column of 'api_keys' in the schema cache"`, it's because the code is trying to access columns that don't match your actual database schema.

## Current Database Schema

Your current database schema has the following columns:
- id (UUID)
- created_at (timestamptz)
- name (text)
- value (text) - This contains the API key
- usage (int8)

## Solution

I've updated the codebase to match your actual database schema by:

1. Changing references from `api_key` to `value` in the code
2. Making `type` and other fields optional
3. Updating the mapping functions

### If You Need to Create the Table

If you need to create the table from scratch, use the following SQL:

```sql
-- Create the api_keys table with the correct schema
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
```

## Environment Variables

Make sure your `.env.local` file has the correct Supabase connection details:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase project URL and anon key. 