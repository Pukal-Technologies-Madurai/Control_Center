import { NextResponse } from 'next/server';
import { getDBConnection } from '@/lib/db';
import { servError } from '@/app/api/responses'

export async function middleware(request) {
  return NextResponse.next();
}


export function withDB(handler) {
  return async function (req, ...args) {
    try {
      const pool = await getDBConnection(); 
      if (!pool || !pool.request) {
        throw new Error('Database connection is not available');
      }
      return handler(req, pool, ...args);
    } catch (e) {
     
      return servError('Database Connection Failed');
    }
  };
}


export const config = {
  matcher: '/api/:path*',
};
