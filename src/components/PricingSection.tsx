'use client';

import { useRouter } from 'next/navigation';
import PricingCard from './PricingCard';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string;
  highlighted: boolean;
  currency: string;
}

interface PricingSectionProps {
  plans: Plan[];
  isLoggedIn: boolean;
}

export default function PricingSection({ plans, isLoggedIn }: PricingSectionProps) {
  const router = useRouter();

  const handleSubscribe = async (planId: string) => {
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Erro ao criar assinatura');
        return;
      }

      // Redirect to Mercado Pago checkout (use sandbox in dev)
      window.location.href = data.sandboxInitPoint || data.initPoint;
    } catch (error) {
      alert('Erro ao processar. Tente novamente.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          onSubscribe={handleSubscribe}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}
