"use client";

import { Search } from "lucide-react";

type DocumentSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DocumentSearch({ value, onChange }: DocumentSearchProps) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por número da DTA, DUIMP ou DI"
        className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pr-3 pl-9 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />
    </div>
  );
}
