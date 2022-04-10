export interface LoginResponse {
  message: string;
  status: number;
  data: {
    bearer_token: string;
  };
}
