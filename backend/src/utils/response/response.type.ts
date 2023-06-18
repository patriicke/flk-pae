export type ResponseType<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  path: string;
  method: string;
};
