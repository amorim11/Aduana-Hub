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
  error?: string;
};

export function FileUploadField({
  label,
  accept,
  hint,
  file,
  onChange,
  required,
  error,
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
        <div
          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm ${
            error ? "border-red-300 bg-red-50" : "border-zinc-200 bg-zinc-50"
          }`}
        >
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
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2.5 text-sm transition-colors ${
            error
              ? "border-red-300 text-red-500 hover:border-red-400"
              : "border-zinc-300 text-zinc-500 hover:border-emerald-400 hover:text-emerald-600"
          }`}
        >
          <Paperclip size={14} />
          Selecionar arquivo
        </button>
      )}
      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : (
        hint && <p className="text-xs text-zinc-400">{hint}</p>
      )}
    </div>
  );
}
