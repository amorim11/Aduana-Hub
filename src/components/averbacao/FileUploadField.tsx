"use client";

import { useId, useRef } from "react";
import { Paperclip, X } from "lucide-react";

type FileUploadFieldProps = {
  label: string;
  accept: string;
  hint?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
};

export function FileUploadField({
  label,
  accept,
  hint,
  file,
  onChange,
  required,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label} {required && <span className="text-emerald-600">*</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        required={required}
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {file ? (
        <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm">
          <span className="flex min-w-0 items-center gap-2 text-zinc-700">
            <Paperclip size={14} className="shrink-0 text-zinc-400" />
            <span className="truncate">{file.name}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              onChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            aria-label={`Remover ${file.name}`}
            className="ml-2 shrink-0 cursor-pointer text-zinc-400 transition-colors hover:text-zinc-700"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:border-emerald-400 hover:text-emerald-600"
        >
          <Paperclip size={14} />
          Selecionar arquivo
        </button>
      )}
      {hint && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}
