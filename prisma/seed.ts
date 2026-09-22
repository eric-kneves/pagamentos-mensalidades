import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      passwordHash: hashedPassword,
      role: 'ADMIN',
    },
  });

  await prisma.plan.upsert({
    where: { id: 'plan_basic' },
    update: {},
    create: {
      id: 'plan_basic',
      name: 'Básico',
      description: 'Plano básico',
      price: 29.90,
      features: JSON.stringify(['Acesso básico', 'Suporte por email', '1 usuário']),
      highlighted: false,
    },
  });

  await prisma.plan.upsert({
    where: { id: 'plan_pro' },
    update: {},
    create: {
      id: 'plan_pro',
      name: 'Profissional',
      description: 'Plano profissional',
      price: 59.90,
      features: JSON.stringify(['Acesso completo', 'Suporte prioritário', '5 usuários', 'Relatórios avançados']),
      highlighted: true,
    },
  });

  await prisma.plan.upsert({
    where: { id: 'plan_premium' },
    update: {},
    create: {
      id: 'plan_premium',
      name: 'Premium',
      description: 'Plano premium',
      price: 99.90,
      features: JSON.stringify(['Acesso ilimitado', 'Suporte 24/7', 'Usuários ilimitados', 'Relatórios avançados', 'API access', 'Consultoria mensal']),
      highlighted: false,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
