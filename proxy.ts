import { NextRequest, NextResponse } from "next/server";

function secureEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return result === 0;
}

const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
};

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME || "eirik";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Admin access is not configured.", {
      status: 503,
      headers: privateHeaders,
    });
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    try {
      const decoded = atob(authorization.slice(6));
      const separator = decoded.indexOf(":");
      const suppliedUser = decoded.slice(0, separator);
      const suppliedPassword = decoded.slice(separator + 1);
      if (
        separator > -1 &&
        secureEqual(suppliedUser, username) &&
        secureEqual(suppliedPassword, password)
      ) {
        const response = NextResponse.next();
        Object.entries(privateHeaders).forEach(([name, value]) =>
          response.headers.set(name, value),
        );
        return response;
      }
    } catch {
      // Fall through to the authentication challenge.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      ...privateHeaders,
      "WWW-Authenticate": 'Basic realm="Eirik conversations", charset="UTF-8"',
    },
  });
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
