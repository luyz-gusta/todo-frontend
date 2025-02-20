import { api } from "../service/api";
import { Response } from "../types/response";
import { Task } from "../types/task";

export const getAllTask = async (): Promise<Response<Task[]>> => {
    const response = await api.get<Response<Task[]>>('/tasks')
    return response.data
}

export const getTaskById = async (id: string): Promise<Response<Task>> => {
    const response = await api.get<Response<Task>>(`/tasks/${id}`)
    return response.data
}

export const createTask = async (task: Task): Promise<Response<Task>> => {
    const response = await api.post<Response<Task>>('/tasks', task)
    return response.data
}

export const updateTask = async (task: Task): Promise<Response<Task>> => {
    const response = await api.put<Response<Task>>('/tasks', task)
    return response.data
}

export const deleteTask = async (id: number): Promise<Response<Task>> => {
    const response = await api.delete<Response<Task>>(`/tasks/${id}`)
    return response.data
}