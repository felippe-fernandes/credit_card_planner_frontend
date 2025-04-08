import { NextResponse, type NextRequest } from "next/server";

type TPublicRoutes = {
  path: string;
  whenAuthenticated: "next" | "redirect";
};

const publicRoutes: TPublicRoutes[] = [
  { path: "/login", whenAuthenticated: "redirect" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/dashboard";

export default function MiddlewareConfig(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const redirectUrl = request.nextUrl.clone();

  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("sb_auth_token");

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    return NextResponse.redirect(redirectUrl);
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    redirectUrl.pathname = "/";
    return NextResponse.next();
  }

  if (authToken && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
