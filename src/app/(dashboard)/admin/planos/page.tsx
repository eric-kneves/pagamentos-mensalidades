import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/utils';

async function togglePlanActive(formData: FormData) {
  'use server';
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const planId = formData.get('planId') as string;
  const active = formData.get('active') === 'true';

  await prisma.plan.update({
    where: { id: planId },
    data: { active: !active },
  });

  revalidatePath('/admin/planos');
}

export default async function PlanosPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== 'ADMIN') redirect('/dashboard');

  const plans = await prisma.plan.findMany({ orderBy: { price: 'asc' } });
  const subscriberCounts = await Promise.all(
    plans.map((plan) => prisma.subscription.count({ where: { planId: plan.id, status: 'AUTHORIZED' } }))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Planos</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assinantes</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((plan, index) => {
              const subscriberCount = subscriberCounts[index];
              return (
                <tr key={plan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{plan.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatCurrency(plan.price)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{subscriberCount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      plan.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <form action={togglePlanActive}>
                      <input type="hidden" name="planId" value={plan.id} />
                      <input type="hidden" name="active" value={String(plan.active)} />
                      <button className="px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-50">
                        {plan.active ? 'Desativar' : 'Ativar'}
                      </button>
                    </form>
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
