// functions/api/github/[[catchall]].ts

/**
 * Interface for the environment variables expected by the Cloudflare Worker.
 * @property GITHUB_PAT - The GitHub Personal Access Token used for authenticating with the GitHub API.
 *                        This should be configured as a secret in the Cloudflare dashboard.
 */
interface Env {
  GITHUB_PAT: string;
}

/**
 * Handles all incoming requests and proxies them to the GitHub API.
 *
 * This function intercepts requests from the client, extracts the intended GitHub API path
 * from the URL, and forwards the request to the actual GitHub API. It securely adds the
 * GitHub Personal Access Token (PAT) to the `Authorization` header on the server-side,
 * ensuring the token is never exposed to the client.
 *
 * @param context - The context object provided by Cloudflare Pages, containing the request,
 *                  environment variables, and other metadata.
 * @returns A `Response` object containing the data fetched from the GitHub API.
 */
export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Create a URL object from the incoming request to easily manipulate it
  const url = new URL(request.url);

  // Determine the actual GitHub API URL to call.
  // It replaces the '/api/github' path segment with the base GitHub API URL.
  // This allows the client to make requests to '/api/github/users/octocat' which are then
  // proxied to 'https://api.github.com/users/octocat'.
  const githubApiUrl = `https://api.github.com${url.pathname.replace(
    '/api/github',
    '',
  )}${url.search}`;

  // Create a new headers object, copying headers from the original request.
  const headers = new Headers(request.headers);

  // Securely add the GitHub PAT to the 'Authorization' header.
  // `env.GITHUB_PAT` is a secret environment variable managed by Cloudflare.
  headers.set('Authorization', `Bearer ${env.GITHUB_PAT}`);
  headers.set('User-Agent', 'TimDeHof-Portfolio-API-Proxy'); // It's a good practice to set a User-Agent.

  try {
    // Make the proxied request to the GitHub API with the new headers.
    const response = await fetch(githubApiUrl, {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
    });

    // Return the response from the GitHub API directly to the client.
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    // If an error occurs (e.g., network issue), return a 500 error.
    console.error('Error proxying request to GitHub API:', error);
    return new Response('Error proxying request to GitHub API', { status: 500 });
  }
};
