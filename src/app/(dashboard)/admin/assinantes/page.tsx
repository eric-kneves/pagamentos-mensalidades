import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatDate, getStatusLabel, getStatusColor } from '@/lib/utils';

async function updateSubscriptionStatus(formData: FormData) {
  'use server';
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const subscriptionId = formData.get('subscriptionId') as string;
  const status = formData.get('status') as string;

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status },
  });

  revalidatePath('/admin/assinantes');
}

export default async function AssinantesPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const users = await prisma.user.findMany({
    where: { role: 'USER' },
    include: {
      subscriptions: {
        include: { plan: true },
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Assinantes</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Desde</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Nenhum assinante encontrado</td>
              </tr>
            )}
            {users.map((u) => {
              const sub = u.subscriptions[0];
              return (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{sub ? sub.plan.name : 'Sem plano'}</td>
                  <td className="px-6 py-4">
                    {sub ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                        {getStatusLabel(sub.status)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {sub?.startDate ? formatDate(sub.startDate) : formatDate(u.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    {sub && sub.status !== 'CANCELLED' && (
                      <form action={updateSubscriptionStatus} className="flex gap-2">
                        <input type="hidden" name="subscriptionId" value={sub.id} />
                        {sub.status !== 'AUTHORIZED' && (
                          <button
                            name="status"
                            value="AUTHORIZED"
                            className="px-3 py-1.5 text-xs font-medium text-green-700 border border-green-300 rounded-lg hover:bg-green-50"
                          >
                            Ativar
                          </button>
                        )}
                        {sub.status !== 'PAUSED' && (
                          <button
                            name="status"
                            value="PAUSED"
                            className="px-3 py-1.5 text-xs font-medium text-orange-700 border border-orange-300 rounded-lg hover:bg-orange-50"
                          >
                            Pausar
                          </button>
                        )}
                        <button
                          name="status"
                          value="CANCELLED"
                          className="px-3 py-1.5 text-xs font-medium text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
                        >
                          Cancelar
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
