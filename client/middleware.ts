import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const user = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isTokenExpired = !user || !user.exp || new Date() > new Date(Number(user.exp) * 1000);

    const { pathname } = request.nextUrl;

    if (pathname === '/fee' && (!user || user.role !== 'student' || isTokenExpired)) {
        return NextResponse.redirect(new URL('/auth/student', request.url));
    }

    if (request.nextUrl.pathname === '/fee/students' && !user && isTokenExpired) {
        return NextResponse.redirect(new URL('/auth/user', request.url));
    }

    if (pathname.startsWith('/admin') && (!user || user.role !== 'user' || isTokenExpired)) {
        return NextResponse.redirect(new URL('/auth/user', request.url));
    }

    if (pathname === '/auth/user' && user?.role === 'user' && !isTokenExpired) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (pathname === '/auth/student' && user?.role === 'student' && !isTokenExpired) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
