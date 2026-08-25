export { default } from "next-auth/middleware";

export const config = {
  // Protects all /admin pages (except login) and all /api/admin/* routes
  // (belt-and-braces — each admin API route also checks the session itself).
  matcher: ["/admin/((?!login).*)", "/api/admin/:path*"],
};
