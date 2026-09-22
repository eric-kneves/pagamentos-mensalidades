export type UserRole = 'USER' | 'ADMIN';

export type SubscriptionStatus = 'PENDING' | 'AUTHORIZED' | 'PAUSED' | 'CANCELLED' | 'EXPIRED';

export type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';

export interface PlanFeature {
  text: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

declare module 'next-auth' {
  interface Session {
    user: SessionUser;
  }
  interface User {
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole;
    id: string;
  }
}
