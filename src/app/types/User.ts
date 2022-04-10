export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  username: string;
  email: string;
  role: string;
  profile_pic: string;
  socials: any[];
  gradients: any[];
  bio: string;
  created_at: string;
  updated_at: string;
}
