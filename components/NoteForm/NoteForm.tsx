"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import css from "./NoteForm.module.css";
import { createNote } from "../../lib/api";
import type { FormNotePayload } from "../../types/note";
import { useNoteDraft } from "@/lib/store/noteStore";
import { ChangeEvent } from "react";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const noteDraft = useNoteDraft();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
      noteDraft.clearDraft();
    },
  });

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as FormNotePayload["tag"];

    if (!title || title.trim().length < 3) {
      return;
    }

    mutate({
      title: title.trim(),
      content: content?.trim() || "",
      tag: tag || "Todo",
    });
  };

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    noteDraft.setDraft({ [name]: value });
  };

  return (
    <form action={handleFormAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          minLength={3}
          maxLength={50}
          className={css.input}
          defaultValue={noteDraft.draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
          defaultValue={noteDraft.draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={noteDraft.draft.tag}
          className={css.select}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
