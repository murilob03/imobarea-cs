export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*', '/imobiliaria/:path*'], // Protect routes under /dashboard
}
