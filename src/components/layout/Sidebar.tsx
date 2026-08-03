"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, ChevronLeft, ChevronRight, X } from "lucide-react";
import { navItems } from "./nav-items";

type SidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-zinc-950 transition-transform duration-200 lg:static lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      } ${collapsed ? "lg:w-20" : "lg:w-64"}`}
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-zinc-800 px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <Boxes size={18} strokeWidth={2} />
          </span>
          <span className={`leading-tight ${collapsed ? "lg:hidden" : ""}`}>
            <span className="block text-sm font-semibold whitespace-nowrap text-zinc-50">
              Agesbec
            </span>
            <span className="block text-xs whitespace-nowrap text-zinc-500">
              Siscomex / Averbações
            </span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Fechar menu"
          className="cursor-pointer text-zinc-400 transition-colors hover:text-zinc-100 lg:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <Icon size={18} strokeWidth={2} className="shrink-0" />
              <span
                className={`whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="hidden shrink-0 border-t border-zinc-800 p-3 lg:block">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
        >
          {collapsed ? (
            <ChevronRight size={18} className="shrink-0" />
          ) : (
            <ChevronLeft size={18} className="shrink-0" />
          )}
          <span className={collapsed ? "lg:hidden" : ""}>Recolher menu</span>
        </button>
      </div>
    </aside>
  );
}
