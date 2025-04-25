import { validateAndCheckRateLimit } from "@/lib/api-keys";
import { createSummarizationChain } from "@/lib/chain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { githubUrl } = await request.json();
    const key = request.headers.get('x-api-key');

    if (!githubUrl) {
      return NextResponse.json(
        { message: "No GitHub repository URL provided" },
        { status: 400 }
      );
    }

    // Validate API key and check rate limit in one step
    const validation = await validateAndCheckRateLimit(key);
    
    if (!validation.isValid) {
      return validation.response;
    }
    
    const readmeContent = await getGitHubReadme(githubUrl);
    
    // Use the LangChain summarization chain
    const summaryData = await createSummarizationChain(readmeContent);

    // Return just the summary and cool_facts for successful response
    return NextResponse.json({
      summary: summaryData.summary,
      cool_facts: summaryData.cool_facts
    });
    
  } catch (error) {
    console.error("Error processing GitHub summarization:", error);
    return NextResponse.json(
      { message: "Server error" },
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


