import { requireAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// GET a specific API key by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const authResult = await requireAuth();
  if (!authResult.isAuthenticated) {
    return authResult.error;
  }

  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    // Fetch the specific API key, ensuring it belongs to the authenticated user
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('id', id)
      .eq('user_id', authResult.userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'API key not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching API key:', err);
    return NextResponse.json(
      { error: 'Failed to fetch API key' },
      { status: 500 }
    );
  }
}

// UPDATE an API key
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const authResult = await requireAuth();
  if (!authResult.isAuthenticated) {
    return authResult.error;
  }

  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    const updates = await request.json();
    
    // Verify the key exists and belongs to this user
    const { data: existingKey, error: fetchError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('id', id)
      .eq('user_id', authResult.userId)
      .single();
    
    if (fetchError || !existingKey) {
      return NextResponse.json(
        { error: 'API key not found or you do not have permission to update it' },
        { status: 404 }
      );
    }

    // Update the API key
    const { data, error } = await supabase
      .from('api_keys')
      .update(updates)
      .eq('id', id)
      .eq('user_id', authResult.userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error updating API key:', err);
    return NextResponse.json(
      { error: 'Failed to update API key' },
      { status: 500 }
    );
  }
}

// DELETE an API key
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verify authentication
  const authResult = await requireAuth();
  if (!authResult.isAuthenticated) {
    return authResult.error;
  }

  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    // Verify the key exists and belongs to this user before deletion
    const { data: existingKey, error: fetchError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('id', id)
      .eq('user_id', authResult.userId)
      .single();
    
    if (fetchError || !existingKey) {
      return NextResponse.json(
        { error: 'API key not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }

    // Delete the API key
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id)
      .eq('user_id', authResult.userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting API key:', err);
    return NextResponse.json(
      { error: 'Failed to delete API key' },
      { status: 500 }
    );
  }
} 