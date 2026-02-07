// functions/api/github/[[catchall]].ts

interface Env {
  VITE_GITHUB_PAT: string;
}

export async function onRequest(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Debug: Log the full request details
  console.log(`Incoming request to: ${url.pathname}`);
  console.log(`Full URL: ${request.url}`);
  console.log(`Request method: ${request.method}`);

  // Extract the GitHub API path from the request
  // Handle both /api/github/... and /api/github paths
  const githubPath = url.pathname.startsWith("/api/github")
    ? url.pathname.replace("/api/github", "")
    : url.pathname;

  const githubUrl = `https://api.github.com${githubPath}${url.search}`;

  console.log(`Proxying GitHub API request: ${githubUrl}`);
  console.log(`Original path: ${url.pathname}, GitHub path: ${githubPath}`);

  try {
    const headers: Record<string, string> = {
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Portfolio-App/1.0",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Add authentication if token is available
    if (env.VITE_GITHUB_PAT) {
      headers.Authorization = `Bearer ${env.VITE_GITHUB_PAT}`;
    }

    const response = await fetch(githubUrl, {
      method: request.method,
      headers,
    });

    const contentType = response.headers.get("Content-Type") || "";
    const data = await response.text();

    // If GitHub returns HTML (rate limit or auth error), convert to JSON error
    if (contentType.includes("text/html") || data.trim().startsWith("<")) {
      console.error("GitHub API returned HTML instead of JSON:", data.substring(0, 500));

      // Check if it's a rate limit error
      if (data.includes("rate limit") || data.includes("API rate limit")) {
        return new Response(JSON.stringify({
          error: "GitHub API rate limit exceeded. Please try again later or add a token.",
          rateLimited: true,
        }), {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      // Generic error
      return new Response(JSON.stringify({
        error: "GitHub API returned an error",
        message: "Received HTML instead of JSON from GitHub",
      }), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(data, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
  catch (error) {
    console.error("GitHub API proxy error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch from GitHub API" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
