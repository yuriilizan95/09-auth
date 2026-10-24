"use client";

import { useState } from "react";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "./NotePage.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

  const { data, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", { page, search: debouncedSearch, tag }],
    queryFn: () => fetchNotes({ page, search: debouncedSearch, tag }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onSearch={(newSearch) => {
            setSearch(newSearch);
            setPage(1);
          }}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={page}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {!isError && data?.notes && <NoteList notes={data.notes} />}
    </div>
  );
}
