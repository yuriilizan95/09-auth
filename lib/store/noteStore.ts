import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormNotePayload } from "@/types/note";

interface NoteDraftStoreProps {
  draft: FormNotePayload;
  setDraft: (note: Partial<FormNotePayload>) => void;
  clearDraft: () => void;
}

const initialDraft: FormNotePayload = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<NoteDraftStoreProps>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((prevState) => ({
          draft: { ...prevState.draft, ...note },
        })),
      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: "note-draft-storage",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
