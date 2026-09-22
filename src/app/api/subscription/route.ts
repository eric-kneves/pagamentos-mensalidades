import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { preApproval } from '@/lib/mercadopago';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { planId } = await request.json();
    if (!planId) {
      return NextResponse.json({ error: 'planId é obrigatório' }, { status: 400 });
    }

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan || !plan.active) {
      return NextResponse.json({ error: 'Plano não encontrado ou inativo' }, { status: 404 });
    }

    // Check for existing active subscription
    const existingSub = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['AUTHORIZED', 'PENDING'] },
      },
    });
    if (existingSub) {
      return NextResponse.json(
        { error: 'Você já possui uma assinatura ativa' },
        { status: 409 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    // Create preapproval on Mercado Pago
    const mpPreapproval = await preApproval.create({
      body: {
        reason: `Assinatura - ${plan.name}`,
        auto_recurring: {
          frequency: plan.frequencyMonths,
          frequency_type: 'months',
          transaction_amount: plan.price,
          currency_id: 'BRL',
        },
        payer_email: session.user.email,
        back_url: `${baseUrl}/dashboard`,
        status: 'pending',
      },
    });

    // Save subscription in DB
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        planId: plan.id,
        status: 'PENDING',
        mercadoPagoPreapprovalId: mpPreapproval.id,
      },
    });

    return NextResponse.json({
      initPoint: mpPreapproval.init_point,
      sandboxInitPoint: mpPreapproval.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: 'Erro ao criar assinatura' },
      { status: 500 }
    );
  }
}

