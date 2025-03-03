import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Lista de slugs válidos (que existem no banco de dados)
const VALID_SLUGS = ["fsw-donalds"];

export function middleware(request: NextRequest) {
  // Verificar se a rota é uma rota dinâmica de restaurante
  const pathname = request.nextUrl.pathname;

  // Se for uma rota raiz ou já começar com /menu, não precisa de middleware
  if (pathname === "/" || pathname.startsWith("/menu")) {
    return NextResponse.next();
  }

  // Verificar se é uma rota de restaurante potencialmente válida
  // Extrai o slug do caminho (removendo barras adicionais)
  const slug = pathname.split("/")[1];

  // Se o slug não estiver na lista de slugs válidos, redirecione para o padrão
  if (
    slug &&
    !VALID_SLUGS.includes(slug) &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api") &&
    !pathname.includes("favicon.ico")
  ) {
    // Redirecionando para o restaurante padrão
    return NextResponse.redirect(new URL("/fsw-donalds", request.url));
  }

  // Para rotas dinâmicas de restaurante válidas, permitir o acesso
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
