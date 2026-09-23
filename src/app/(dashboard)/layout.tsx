import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect('/login');
  }

  const role = (session.user as any).role as string;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRole={role} />
      <div className="flex-1">
        <header className="flex items-center justify-end gap-4 bg-white border-b border-gray-200 px-6 py-4">
          <span className="text-sm text-gray-500">Olá, {session.user.name}</span>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
              Sair
            </button>
          </form>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
