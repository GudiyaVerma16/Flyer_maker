// Middleware disabled for Flyer Maker app - no authentication required
export default function middleware(req) {
  // Allow all requests without authentication
  return null;
}

export const config = {
  matcher: [], // No routes require authentication
};
