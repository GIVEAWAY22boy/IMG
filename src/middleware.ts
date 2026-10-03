import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect all /studio routes except /studio/login
  if (path.startsWith('/studio') && !path.startsWith('/studio/login')) {
    const session = request.cookies.get('admin_session');
    
    if (!session || session.value !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(new URL('/studio/login', request.url));
    }
  }

  // Redirect authenticated users away from the login page
  if (path === '/studio/login') {
    const session = request.cookies.get('admin_session');
    if (session && session.value === process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(new URL('/studio', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*'],
};
