import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import PricingSection from '@/components/PricingSection';

export default async function HomePage() {
  const session = await auth();
  const plans = await prisma.plan.findMany({
    where: { active: true },
    orderBy: { price: 'asc' },
  });

  return (
    <div className="min-h-screen">
      <Navbar session={session} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Simplifique seus pagamentos de mensalidades
            </h1>
            <p className="mt-6 text-lg md:text-xl text-blue-100">
              Gerencie assinaturas, receba pagamentos recorrentes e acompanhe tudo em um único lugar.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#planos"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition shadow-lg"
              >
                Ver planos
              </a>
              <a
                href="/registro"
                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition border border-blue-400"
              >
                Criar conta grátis
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg viewBox="0 0 1440 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 58h1440V30C1200 50 960 0 720 30S240 50 0 30v28z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Escolha seu plano</h2>
          <p className="mt-4 text-lg text-gray-500">
            Planos flexíveis que se adaptam às suas necessidades
          </p>
        </div>
        <PricingSection plans={plans} isLoggedIn={!!session} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl font-bold text-white mb-2">MensaliPay</p>
          <p className="text-sm">Sistema de gerenciamento de mensalidades e assinaturas recorrentes</p>
          <p className="mt-6 text-xs">© {new Date().getFullYear()} MensaliPay. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
