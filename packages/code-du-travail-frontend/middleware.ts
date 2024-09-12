import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')


  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('X-nonce', nonce)



  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })


  return response
}
