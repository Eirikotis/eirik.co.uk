const canonicalOrigin = "https://eirik.co.uk";

const redirects = new Map([
  ["/work/bittensor", "bittensor"],
  ["/work/void", "void"],
  ["/work/bittensor-autoresearch", "autoresearch"],
  ["/work/dusd", "dusd"],
  ["/work/one-click-labs", "one-click-labs"],
  ["/work/kpmg", "kpmg"],
  ["/experience", "experience"],
  ["/about", "about"],
]);

const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";

    if (path.startsWith("/api/") || path.startsWith("/admin")) {
      const target = new URL(`${url.pathname}${url.search}`, canonicalOrigin);
      return fetch(new Request(target, request));
    }

    const ask = redirects.get(path);
    if (ask) return Response.redirect(new URL(`/?ask=${ask}`, url.origin), 301);

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    if (!url.pathname.includes(".")) return env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
    return response;
  },
};

export default worker;
