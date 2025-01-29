export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/imobiliaria/:path*',
    '/imoveis/novo',
    '/agentes',
    '/perfil',
    '/imoveis',
    '/inicio',
  ], // Protect routes under /dashboard
}
