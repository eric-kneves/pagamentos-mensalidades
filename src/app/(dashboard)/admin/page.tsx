import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import StatsCard from '@/components/StatsCard';
import { formatCurrency } from '@/lib/utils';

export default async function AdminPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const [totalSubscribers, activeSubscriptions, pendingSubscriptions, payments] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.subscription.count({ where: { status: 'AUTHORIZED' } }),
    prisma.subscription.count({ where: { status: 'PENDING' } }),
    prisma.payment.findMany({ where: { status: 'APPROVED' }, select: { amount: true } }),
  ]);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Painel Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Assinantes" value={totalSubscribers} icon="users" />
        <StatsCard title="Assinaturas ativas" value={activeSubscriptions} icon="subscription" />
        <StatsCard title="Assinaturas pendentes" value={pendingSubscriptions} icon="pending" />
        <StatsCard title="Receita total" value={formatCurrency(totalRevenue)} icon="money" />
      </div>
    </div>
  );
}
