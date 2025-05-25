import type { UUID } from "crypto";
import { http } from "@/api/auth";

export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: string; // ISO date string
  priority: "Low" | "Normal" | "High";
}

export interface Todo {
  id: UUID;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string; // ISO date string
  dueDate?: string; // ISO date string
  priority: "Low" | "Normal" | "High";
  userId: UUID;
  // user?: AppUser; // Uncomment and define AppUser interface if needed
}

export const fetchTodos = () => http.get<Todo[]>("/ToDo");

export const fetchTodo = (id: UUID) => http.get<Todo[]>(`/ToDo/${id}`);

export const createTodo = (dto: CreateTodoDto) => http.post<Todo>("/ToDo", dto);

export const updateTodo = (id: UUID, dto: Partial<Todo>) =>
  http.put<Partial<Todo>>(`/Todo/${id}`, dto);

export const deleteTodo = (id: UUID) => http.delete(`/ToDo/${id}`);

export const markTodoCompleted = (id: string) => http.put(`/ToDo/${id}`);
