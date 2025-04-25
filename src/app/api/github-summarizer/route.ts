import { createSummarizationChain } from "@/lib/chain";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { githubUrl } = await request.json();

    const key = request.headers.get('x-api-key');
    
    if (!key) {
      return NextResponse.json(
        { success: false, message: "No API key provided" },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, message: "No GitHub repository URL provided" },
        { status: 400 }
      );
    }

    // Check if the key exists in the database using multiple filter conditions
    const { data, error } = await supabase
      .from("api_keys")
      .select("id")
      .in("value", [key, `tvly-dev-${key}`, `tvly-prod-${key}`])
      .limit(1);
    
    if (error) {
      console.error("Error validating API key:", error);
      return NextResponse.json(
        { success: false, message: "Error validating API key" },
        { status: 500 }
      );
    }
    
    // If we found a match, the key is valid
    const isValid = data && data.length > 0;
    
    if (!isValid) {
      return NextResponse.json({ 
        success: false,
        message: "Invalid API key"
      }, { status: 401 });
    }
    
    const readmeContent = await getGitHubReadme(githubUrl);
    
    // Use the LangChain summarization chain
    const summaryData = await createSummarizationChain(readmeContent);

    return NextResponse.json({ 
      success: true,
      message: "GitHub repository summarization completed",
      data: {
        repoUrl: githubUrl,
        summary: summaryData.summary,
        coolFacts: summaryData.cool_facts
      }
    });
    
  } catch (error) {
    console.error("Error processing GitHub summarization:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
} 

// Function to fetch README content from GitHub repository
async function getGitHubReadme(githubUrl: string): Promise<string> {
  try {
    // Extract owner and repo from GitHub URL
    const urlParts = githubUrl
      .replace('https://github.com/', '')
      .replace('.git', '')
      .split('/');
    
    if (urlParts.length !== 2) {
      throw new Error('Invalid GitHub repository URL format');
    }

    const [owner, repo] = urlParts;

    // Fetch README content using GitHub API
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.raw',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }

    const readmeContent = await response.text();
    return readmeContent;

  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    throw new Error('Failed to fetch repository README');
  }
}


