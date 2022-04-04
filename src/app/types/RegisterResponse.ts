export interface RegisterResponse {
  message: string;
  status: number;
  data: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    username: string;
    email: string;
    bearer_token: string;
    created_at: string;
    updated_at: string;
  };
}
