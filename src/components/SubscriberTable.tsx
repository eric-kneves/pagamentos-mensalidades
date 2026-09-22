import { formatDate, getStatusLabel, getStatusColor } from '@/lib/utils';

interface SubscriberData {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  subscriptions: {
    status: string;
    plan: { name: string };
    startDate: Date | string | null;
  }[];
}

interface SubscriberTableProps {
  subscribers: SubscriberData[];
}

export default function SubscriberTable({ subscribers }: SubscriberTableProps) {
  if (subscribers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
        <p className="text-gray-500">Nenhum assinante encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Desde</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {subscribers.map((sub) => {
            const activeSub = sub.subscriptions[0];
            return (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{sub.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {activeSub ? activeSub.plan.name : 'Sem plano'}
                </td>
                <td className="px-6 py-4">
                  {activeSub ? (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activeSub.status)}`}>
                      {getStatusLabel(activeSub.status)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {activeSub?.startDate ? formatDate(activeSub.startDate) : formatDate(sub.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
