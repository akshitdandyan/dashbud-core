export interface RestControllerResponse<T> {
    error?: string;
    data?: T;
}
