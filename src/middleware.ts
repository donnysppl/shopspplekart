import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt_decode from "jwt-decode";

interface DecodedbarierToken {
  exp: number,
  iat: number,
}

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/';

  const token = request.cookies.get('admin-token')?.value || '';
  const bartoken = request.cookies.get('barear-token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*', '/'
  ],
}