import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const xSignature = request.headers.get('x-signature');
    const xRequestId = request.headers.get('x-request-id');

    if (!validateWebhookSignature(xSignature, xRequestId, body.data?.id)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const { type, data } = body;

    if (type === 'subscription_preapproval') {
      await handleSubscriptionUpdate(data.id);
    } else if (type === 'payment') {
      await handlePaymentNotification(data.id);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}

function validateWebhookSignature(
  xSignature: string | null,
  xRequestId: string | null,
  dataId: string
): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret || !xSignature || !xRequestId) return false;

  const parts = xSignature.split(',');
  const ts = parts.find((p) => p.trim().startsWith('ts='))?.split('=')[1];
  const hash = parts.find((p) => p.trim().startsWith('v1='))?.split('=')[1];

  if (!ts || !hash) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const hmac = crypto.createHmac('sha256', secret).update(manifest).digest('hex');

  return hmac === hash;
}

async function handleSubscriptionUpdate(preapprovalId: string) {
  const response = await fetch(
    `https://api.mercadopago.com/preapproval/${preapprovalId}`,
    {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    }
  );
  const preapproval = await response.json();

  const statusMap: Record<string, string> = {
    authorized: 'AUTHORIZED',
    paused: 'PAUSED',
    cancelled: 'CANCELLED',
    pending: 'PENDING',
  };

  const newStatus = statusMap[preapproval.status] || 'PENDING';

  await prisma.subscription.updateMany({
    where: { mercadoPagoPreapprovalId: preapprovalId },
    data: {
      status: newStatus,
      nextPaymentDate: preapproval.next_payment_date
        ? new Date(preapproval.next_payment_date)
        : undefined,
    },
  });
}

async function handlePaymentNotification(paymentId: string) {
  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    }
  );
  const payment = await response.json();

  const subscription = await prisma.subscription.findFirst({
    where: { mercadoPagoPreapprovalId: payment.metadata?.preapproval_id },
  });

  if (!subscription) return;

  const statusMap: Record<string, string> = {
    approved: 'APPROVED',
    pending: 'PENDING',
    rejected: 'REJECTED',
    refunded: 'REFUNDED',
  };

  await prisma.payment.upsert({
    where: { mercadoPagoPaymentId: paymentId },
    create: {
      subscriptionId: subscription.id,
      amount: payment.transaction_amount,
      status: statusMap[payment.status] || 'PENDING',
      mercadoPagoPaymentId: paymentId,
      paidAt: payment.date_approved ? new Date(payment.date_approved) : null,
    },
    update: {
      status: statusMap[payment.status] || 'PENDING',
      paidAt: payment.date_approved ? new Date(payment.date_approved) : null,
    },
  });
}

