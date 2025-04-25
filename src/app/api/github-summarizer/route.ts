import { validateAndCheckRateLimit } from "@/lib/api-keys";
import { createSummarizationChain } from "@/lib/chain";
import { getGitHubRepoDetails } from "@/lib/github";
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
    
    const repoDetails = await getGitHubRepoDetails(githubUrl);
    
    // Use the LangChain summarization chain
    const summaryData = await createSummarizationChain(repoDetails.readmeContent);

    // Return the summary, cool_facts, and repository details
    return NextResponse.json({
      summary: summaryData.summary,
      cool_facts: summaryData.cool_facts,
      stars: repoDetails.stars,
      latest_version: repoDetails.latestVersion,
      website_url: repoDetails.websiteUrl,
      license: repoDetails.license
    });
    
  } catch (error) {
    console.error("Error processing GitHub summarization:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


