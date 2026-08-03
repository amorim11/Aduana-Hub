import type { LucideIcon } from "lucide-react";
import { FilePlus, FileSearch, LayoutDashboard } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/averbacao", label: "Averbação", icon: FilePlus },
  { href: "/consulta", label: "Consulta de Documentos", icon: FileSearch },
];
