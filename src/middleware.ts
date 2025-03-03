import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar se a rota é uma rota dinâmica de restaurante
  const pathname = request.nextUrl.pathname;

  // Se for uma rota raiz ou já começar com /menu, não precisa de middleware
  if (pathname === "/" || pathname.startsWith("/menu")) {
    return NextResponse.next();
  }

  // Para rotas dinâmicas de restaurante, permitir o acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
