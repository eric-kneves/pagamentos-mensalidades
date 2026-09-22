'use client';

import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string;
  highlighted: boolean;
  currency: string;
}

interface PricingCardProps {
  plan: Plan;
  onSubscribe: (planId: string) => void;
  isLoggedIn: boolean;
}

export default function PricingCard({ plan, onSubscribe, isLoggedIn }: PricingCardProps) {
  const features: string[] = JSON.parse(plan.features);

  return (
    <div
      className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-lg transition hover:shadow-xl ${
        plan.highlighted ? 'ring-2 ring-blue-600 scale-105' : 'ring-1 ring-gray-200'
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
          Mais Popular
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
      <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

      <div className="mt-6">
        <span className="text-4xl font-bold text-gray-900">{formatCurrency(plan.price)}</span>
        <span className="text-sm text-gray-500">/mês</span>
      </div>

      <ul className="mt-8 space-y-3 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      {isLoggedIn ? (
        <button
          onClick={() => onSubscribe(plan.id)}
          className={`mt-8 w-full py-3 px-6 rounded-lg font-medium transition ${
            plan.highlighted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Assinar agora
        </button>
      ) : (
        <Link
          href="/registro"
          className={`mt-8 w-full py-3 px-6 rounded-lg font-medium text-center transition block ${
            plan.highlighted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Criar conta
        </Link>
      )}
    </div>
  );
}
