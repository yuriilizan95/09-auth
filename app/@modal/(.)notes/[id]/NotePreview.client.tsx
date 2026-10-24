"use client";

import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    note && (
      <Modal onClose={handleClose}>
        <main className={css.main}>
          <div className={css.container}>
            <button type="button" onClick={handleClose} className={css.backBtn}>
              Back
            </button>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          </div>
        </main>
      </Modal>
    )
  );
};

export default NotePreviewClient;
