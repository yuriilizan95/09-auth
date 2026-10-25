import { AxiosResponse } from "axios";
import {
  FetchNotesParams,
  FetchNotesResponse,
  SessionResponse,
} from "./clientApi";
import api from "./api";
import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const fetchNotes = async (
  params?: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const cs = await cookies();

  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      page: params?.page ?? 1,
      search: params?.search || undefined,
      perPage: params?.perPage ?? 10,
      tag: params?.tag && params.tag !== "all" ? params.tag : undefined,
    },
    headers: { cookie: cs.toString() },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cs = await cookies();

  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`, {
    headers: { cookie: cs.toString() },
  });
  return response.data;
};

export const checkSession = async () => {
  const cs = await cookies();
  const response = await api.get<SessionResponse>(`/auth/session`, {
    headers: { cookie: cs.toString() },
  });
  return response;
};

export const getMe = async () => {
  const cs = await cookies();
  const { data } = await api.get<User>(`/users/me`, {
    headers: { cookie: cs.toString() },
  });
  return data;
};
