import { create } from "zustand";
import type { Modal, ProcessType } from "@/mocks/data";

export type UploadStatus = "processing" | "completed" | "failed";
export type { Modal, ProcessType };

export type UploadItem = {
  id: string;
  dtaNumber: string;
  importerName: string;
  processType: ProcessType;
  processNumber: string;
  paisOrigem: string;
  modal: Modal;
  numeroConhecimento: string;
  files: string[];
  status: UploadStatus;
  progress: number;
  createdAt: string;
};

type NewUploadInput = {
  id: string;
  dtaNumber: string;
  importerName: string;
  processType: ProcessType;
  processNumber: string;
  paisOrigem: string;
  modal: Modal;
  numeroConhecimento: string;
  files: string[];
};

type UploadStore = {
  queue: UploadItem[];
  addUpload: (input: NewUploadInput) => void;
  updateProgress: (id: string, progress: number) => void;
  setStatus: (id: string, status: UploadStatus) => void;
  retryUpload: (id: string) => void;
  removeUpload: (id: string) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  queue: [],

  addUpload: (input) => {
    const item: UploadItem = {
      ...input,
      status: "processing",
      progress: 0,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ queue: [item, ...state.queue] }));
  },

  updateProgress: (id, progress) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, progress } : item,
      ),
    })),

  setStatus: (id, status) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    })),

  retryUpload: (id) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.id === id ? { ...item, status: "processing", progress: 0 } : item,
      ),
    })),

  removeUpload: (id) =>
    set((state) => ({
      queue: state.queue.filter((item) => item.id !== id),
    })),
}));
