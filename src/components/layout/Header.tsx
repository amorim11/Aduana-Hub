"use client";

import { usePathname } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { navItems } from "./nav-items";

type HeaderProps = {
  onOpenMobileMenu: () => void;
};

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const current = navItems.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menu"
          className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-900 lg:hidden"
        >
          <Menu size={22} />
        </button>
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {current?.label ?? "Agesbec"}
          </p>
          <p className="hidden text-xs text-zinc-500 sm:block">
            Siscomex / Averbações
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-zinc-900">
            Operador Aduaneiro
          </p>
          <p className="text-xs text-zinc-500">Comissária</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-600">
          OA
        </span>
        <a
          href="/login"
          aria-label="Sair"
          title="Sair"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
        >
          <LogOut size={18} />
        </a>
      </div>
    </header>
  );
}
