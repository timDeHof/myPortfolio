interface Env {
  GITHUB_PAT: string;
  GITHUB_API_URL: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Construct the target URL
    const targetUrl = `${env.GITHUB_API_URL}${path}${url.search}`;
    
    // Clone headers and add Authorization and User-Agent
    const headers = new Headers(request.headers);
    if (env.GITHUB_PAT) {
      headers.set('Authorization', `token ${env.GITHUB_PAT}`);
    }
    headers.set('User-Agent', 'Cloudflare-Worker-GitHub-Proxy');
    
    // Add CORS headers for the response
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : null,
      });
      
      // Create a new response with CORS headers
      const newResponse = new Response(response.body, response);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        newResponse.headers.set(key, value);
      });
      
      return newResponse;
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal Server Error', details: (error as Error).message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};