'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  session: { user?: { name?: string | null; role?: string } } | null;
}

export default function Navbar({ session }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MensaliPay
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#planos" className="text-gray-600 hover:text-blue-600 transition">
              Planos
            </Link>
            {session?.user ? (
              <div className="flex items-center gap-4">
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="text-gray-600 hover:text-blue-600 transition">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition">
                  Dashboard
                </Link>
                <span className="text-sm text-gray-500">Olá, {session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 transition"
                >
                  Entrar
                </Link>
                <Link
                  href="/registro"
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/#planos" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
              Planos
            </Link>
            {session?.user ? (
              <>
                {session.user.role === 'ADMIN' && (
                  <Link href="/admin" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-blue-600">
                  Entrar
                </Link>
                <Link href="/registro" className="block px-3 py-2 text-blue-600 font-medium">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
