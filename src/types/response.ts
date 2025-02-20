export interface Response<T> {
    status: number;
    message: string;
    error?: string
    data: T;
}