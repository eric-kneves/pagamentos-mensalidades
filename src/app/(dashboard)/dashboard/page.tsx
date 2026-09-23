import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/StatsCard';
import PaymentHistory from '@/components/PaymentHistory';

export default async function DashboardPage() {
  const session = await auth();
  const userId = session!.user!.id as string;

  const subscription = await prisma.subscription.findFirst({
    where: { userId, status: { in: ['AUTHORIZED', 'PENDING'] } },
    include: { plan: true },
    orderBy: { createdAt: 'desc' },
  });

  const payments = await prisma.payment.findMany({
    where: { subscription: { userId } },
    include: { subscription: { include: { plan: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Meu Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          title="Plano atual"
          value={subscription ? subscription.plan.name : 'Nenhum'}
          icon="subscription"
        />
        <StatsCard
          title="Status da assinatura"
          value={subscription ? subscription.status : '—'}
          icon="pending"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Histórico de pagamentos</h2>
        <PaymentHistory payments={payments} />
      </div>
    </div>
  );
}
