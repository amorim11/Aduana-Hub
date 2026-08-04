import type { LucideIcon } from "lucide-react";
import { Plane, Ship, Truck } from "lucide-react";
import type { Modal } from "@/mocks/data";

export const modalMeta: Record<Modal, { label: string; icon: LucideIcon }> = {
  maritimo: { label: "Marítimo", icon: Ship },
  rodoviario: { label: "Rodoviário", icon: Truck },
  aereo: { label: "Aéreo", icon: Plane },
};
