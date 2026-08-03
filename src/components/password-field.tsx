"use client";

import { useId, useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

export function PasswordField() {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-zinc-300">
          Senha
        </label>
        <a
          href="#"
          className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
        >
          Esqueceu a senha?
        </a>
      </div>
      <div className="relative">
        <input
          id={id}
          name="password"
          type={visible ? "text" : "password"}
          required
          autoComplete="current-password"
          placeholder="Mínimo 8 caracteres"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 pr-11 text-sm text-zinc-50 placeholder:text-zinc-400 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-zinc-400 transition-colors hover:text-zinc-100"
        >
          {visible ? (
            <EyeSlash size={18} weight="bold" />
          ) : (
            <Eye size={18} weight="bold" />
          )}
        </button>
      </div>
    </div>
  );
}
