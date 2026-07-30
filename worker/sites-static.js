const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.includes(".")) {
      const fallbackPath = url.pathname.endsWith("/")
        ? `${url.pathname}index.html`
        : `${url.pathname}/index.html`;
      return env.ASSETS.fetch(new Request(new URL(fallbackPath, url.origin), request));
    }

    return response;
  },
};

export default worker;
