import Image from "next/image";
import { StackIcon } from "@phosphor-icons/react/dist/ssr";
import { PasswordField } from "@/components/password-field";

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden lg:block">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80&auto=format&fit=crop"
          alt="Vista aérea de um terminal de contêineres"
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 0px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-zinc-950/5 to-transparent" />
      </div>

      <div className="flex min-h-dvh items-center justify-center bg-zinc-950 px-6 py-10 sm:px-10 sm:py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <StackIcon size={20} weight="bold" />
            </span>
            <div className="leading-tight">
              <p className="font-semibold tracking-tight text-zinc-50">
                Aduana Hub
              </p>
              <p className="text-xs text-zinc-400">Módulo de operadores</p>
            </div>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Acesse o módulo para averbar DTA, DI e DUIMP no seu Porto Seco.
          </p>

          <form className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-300"
              >
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

          <p className="mt-8 text-center text-sm text-zinc-400">
            Acesso apenas por convite. Precisa de credenciais?{" "}
            <a
              href="#"
              className="font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Fale com o administrador
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
