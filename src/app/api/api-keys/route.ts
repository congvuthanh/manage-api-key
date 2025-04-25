import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/api-keys - Get all API keys for the authenticated user
export async function GET() {
  // Verify authentication
  const authResult = await requireAuth();
  if (!authResult.isAuthenticated) {
    return authResult.error;
  }

  try {
    // Get keys for the current user
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', authResult.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error in API keys endpoint:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// POST /api/api-keys - Create a new API key for the authenticated user
export async function POST(request: NextRequest) {
  // Verify authentication
  const authResult = await requireAuth();
  if (!authResult.isAuthenticated) {
    return authResult.error;
  }

  try {
    const body = await request.json();
    const { name, type = 'dev' } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      );
    }

    // Generate a unique API key
    const apiKeyValue = generateApiKey();

    // Insert the new API key with the user ID
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          name,
          value: apiKeyValue,
          type,
          usage: 0,
          user_id: authResult.userId,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      return NextResponse.json(
        { error: 'Failed to create API key' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error in create API key endpoint:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Helper function to generate a random API key
function generateApiKey() {
  const prefix = 'ak_';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = prefix;
  
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
} 