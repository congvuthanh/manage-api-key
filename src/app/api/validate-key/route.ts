import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();
    
    if (!key) {
      return NextResponse.json(
        { valid: false, message: "No API key provided" },
        { status: 400 }
      );
    }

    // Check if the key exists in the database
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .or(`value.eq.${key},value.eq.tvly-dev-${key},value.eq.tvly-prod-${key}`)
      .limit(1);
    
    if (error) {
      console.error("Error validating API key:", error);
      return NextResponse.json(
        { valid: false, message: "Error validating API key" },
        { status: 500 }
      );
    }
    
    // If we found a match, the key is valid
    const isValid = data && data.length > 0;
    
    return NextResponse.json({ 
      valid: isValid,
      message: isValid ? "API key is valid" : "Invalid API key"
    });
    
  } catch (error) {
    console.error("Error processing API key validation:", error);
    return NextResponse.json(
      { valid: false, message: "Server error" },
      { status: 500 }
    );
  }
} 