import { NextResponse } from "next/server";
import { ApiKeyRecord, supabase } from "./supabase";

type ApiKeyValidationResult = {
  isValid: boolean;
  apiKey?: ApiKeyRecord;
  response?: NextResponse;
};

/**
 * Validates if an API key exists and is valid
 * @param key The API key to validate
 * @returns Object containing validation result and response if validation failed
 */
export async function validateApiKey(
  key: string | null
): Promise<ApiKeyValidationResult> {
  if (!key) {
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "No API key provided" },
        { status: 400 }
      ),
    };
  }

  // Check if the key exists in the database
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("value", key)
    .limit(1);

  if (error) {
    console.error("Error validating API key:", error);
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "Error validating API key" },
        { status: 500 }
      ),
    };
  }

  // If we found a match, the key is valid
  if (!data || data.length === 0) {
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "Invalid API key. Please check your credentials and try again." },
        { status: 401 }
      ),
    };
  }

  const apiKey = data[0] as ApiKeyRecord;

  return {
    isValid: true,
    apiKey,
  };
}

/**
 * Checks rate limits for an API key and increments its usage
 * @param apiKey The API key record to check
 * @returns Object containing validation result and response if rate limit exceeded
 */
export async function checkRateLimit(
  apiKey: ApiKeyRecord
): Promise<ApiKeyValidationResult> {
  // Increment usage count and update last_used timestamp
  const newUsage = (apiKey.usage || 0) + 1;
  const { error: updateError } = await supabase
    .from("api_keys")
    .update({
      usage: newUsage,
      last_used: new Date().toISOString(),
    })
    .eq("id", apiKey.id);

  if (updateError) {
    console.error("Error updating API key usage:", updateError);
    return {
      isValid: false,
      response: NextResponse.json(
        { message: "Could not update API key usage tracking. Please try again later." },
        { status: 500 }
      ),
    };
  }

  // Check if usage exceeds limit (fallback to 100 if not set)
  const usageLimit = apiKey.limit || 100;
  if (newUsage > usageLimit) {
    return {
      isValid: false,
      response: NextResponse.json(
        {
          message: "API rate limit exceeded. Please upgrade your plan or try again later.",
          usage: newUsage,
          limit: usageLimit,
          remaining: 0
        },
        { status: 429 }
      ),
    };
  }

  // Update the apiKey object with the new usage count
  apiKey.usage = newUsage;

  return {
    isValid: true,
    apiKey,
  };
}

/**
 * Combined function that validates an API key and checks rate limits
 * @param key The API key to validate and check
 * @returns Object containing validation result and response if validation failed
 */
export async function validateAndCheckRateLimit(
  key: string | null
): Promise<ApiKeyValidationResult> {
  const validation = await validateApiKey(key);
  
  if (!validation.isValid) {
    return validation;
  }
  
  return checkRateLimit(validation.apiKey!);
} 