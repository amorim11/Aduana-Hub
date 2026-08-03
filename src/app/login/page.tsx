import Image from "next/image";
import { LoginForm } from "@/components/login-form";

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

          <LoginForm />

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
