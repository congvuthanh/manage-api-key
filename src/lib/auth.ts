import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// Helper function to get user from email
export async function getUserIdFromEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data?.id;
}

// Helper function to check if user owns an API key
export async function checkKeyOwnership(keyId: string, userId: string) {
  const { data, error } = await supabase
    .from('api_keys')
    .select('id')
    .eq('id', keyId)
    .eq('user_id', userId)
    .single();
  
  if (error) return false;
  return !!data;
}

// Middleware-like function to check authentication for API routes
export async function requireAuth() {
  // Get the current session
  const session = await getServerSession();
  
  // Check if user is authenticated
  if (!session || !session.user?.email) {
    return { 
      isAuthenticated: false,
      error: NextResponse.json(
        { error: 'Unauthorized: You must be signed in to access this endpoint' },
        { status: 401 }
      )
    };
  }
  
  // Get user ID from email
  try {
    const userId = await getUserIdFromEmail(session.user.email);
    
    if (!userId) {
      return {
        isAuthenticated: false,
        error: NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      };
    }
    
    return {
      isAuthenticated: true,
      userId
    };
  } catch (error) {
    console.error('Error getting user ID:', error);
    return {
      isAuthenticated: false,
      error: NextResponse.json(
        { error: 'Failed to authenticate user' },
        { status: 500 }
      )
    };
  }
} 