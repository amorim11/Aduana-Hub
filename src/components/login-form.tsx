"use client";

import { useRouter } from "next/navigation";
import { PasswordField } from "@/components/password-field";

export function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-300">
          E-mail corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nome@comissaria.com.br"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-50 placeholder:text-zinc-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <PasswordField />

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          name="remember"
          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 accent-emerald-500"
        />
        Manter conectado neste dispositivo
      </label>

      <button
        type="submit"
        className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-500 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400 active:scale-[0.98]"
      >
        Entrar
      </button>
    </form>
  );
}
