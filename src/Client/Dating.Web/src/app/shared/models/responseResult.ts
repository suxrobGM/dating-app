export interface ResponseResult<T = unknown> {
  success: boolean;
  value?: T;
  error?: string;
}
