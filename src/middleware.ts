export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/imobiliaria/:path*',
    '/imoveis/novo',
    '/agentes',
  ], // Protect routes under /dashboard
}
