import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

const loginAction = async (formData: FormData) => {
  'use server';

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/login?error=invalid');
    }
    throw error;
  }
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const isInvalid = params.error === 'invalid';

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-zinc-100">
      <section className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="mt-2 text-sm text-zinc-400">영화 목록을 보려면 로그인하세요.</p>

        {isInvalid ? (
          <p className="mt-4 rounded-md border border-red-800 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            이메일 또는 비밀번호가 올바르지 않습니다.
          </p>
        ) : null}

        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-zinc-300">이메일</span>
            <input
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-zinc-300">비밀번호</span>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 outline-none focus:border-zinc-500"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-zinc-100 px-3 py-2 font-semibold text-zinc-900 hover:bg-zinc-200"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  );
}
