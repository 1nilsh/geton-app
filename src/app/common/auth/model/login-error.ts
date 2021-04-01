export interface LoginError {
  additional_errors?: LoginError[];
  code: string;
  data?: string;
  message: string;
}
