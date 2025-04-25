// Type definition for repository details
export type RepoDetails = {
  owner: string;
  repo: string;
  stars: number;
  latestVersion: string;
  readmeContent: string;
  websiteUrl: string;
  license: string;
};

// Function to fetch repository details including README, stars and latest version
export async function getGitHubRepoDetails(githubUrl: string): Promise<RepoDetails> {
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

    // Base options for GitHub API requests
    const baseOptions = {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    };

    const readmeOptions = {
      headers: {
        'Accept': 'application/vnd.github.raw',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    };

    // Run all initial API requests in parallel
    const [repoData, readmeResponse, releasesResponse] = await Promise.all([
      // Fetch repository data
      fetch(`https://api.github.com/repos/${owner}/${repo}`, baseOptions)
        .then(res => res.ok ? res.json() : Promise.reject(`Failed to fetch repository data: ${res.statusText}`)),
      
      // Fetch README content
      fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, readmeOptions)
        .then(res => res.ok ? res.text() : Promise.reject(`Failed to fetch README: ${res.statusText}`)),
      
      // Fetch latest release
      fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, baseOptions)
        .then(res => res.ok ? res.json() : { status: res.status, ok: false })
    ]);

    const stars = repoData.stargazers_count || 0;
    const readmeContent = readmeResponse;
    
    // Extract website URL (homepage) from repository data
    const websiteUrl = repoData.homepage || "";
    
    // Extract license information
    const license = repoData.license ? repoData.license.name || repoData.license.spdx_id || "Unknown" : "None";
    
    // Default version if no releases found
    let latestVersion = "No release version found";
    
    // Process release data if available
    if (releasesResponse.ok !== false) {
      latestVersion = releasesResponse.tag_name || latestVersion;
    } else {
      // If no releases, try to get tags
      const tagsResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/tags`,
        baseOptions
      );
      
      if (tagsResponse.ok) {
        const tagsData = await tagsResponse.json();
        if (tagsData.length > 0) {
          latestVersion = tagsData[0].name;
        }
      }
    }

    return {
      owner,
      repo,
      stars,
      latestVersion,
      readmeContent,
      websiteUrl,
      license
    };

  } catch (error) {
    console.error('Error fetching GitHub repository details:', error);
    throw new Error('Failed to fetch repository details');
  }
} 