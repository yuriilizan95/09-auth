import { type AxiosResponse } from "axios";
import type { Note, FormNotePayload, User } from "@/types/note";
import api from "./api";

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthProps {
  email: string;
  password: string;
}

export interface SessionResponse {
  message: string;
}

export interface UpdateUserRequest {
  email?: string;
  username: string;
}
export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search,
  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search: search || undefined,
      tag: tag && tag !== "all" ? tag : undefined,
    },
  });

  return data;
};

export const createNote = async (noteData: FormNotePayload): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const register = async (registerRequest: AuthProps): Promise<User> => {
  const { data } = await api.post<User>(`/auth/register`, registerRequest);
  return data;
};

export const login = async (registerRequest: AuthProps): Promise<User> => {
  const { data } = await api.post<User>(`/auth/login`, registerRequest);
  return data;
};

export const checkSession = async () => {
  const { data } = await api.get<SessionResponse>(`/auth/session`);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>(`/users/me`);
  return data;
};

export const logout = async () => {
  const { data } = await api.post<SessionResponse>(`/auth/logout`);
  return data;
};

export const updateMe = async (newUserData: UpdateUserRequest) => {
  const { data } = await api.patch<User>(`/users/me`, newUserData);
  return data;
};
