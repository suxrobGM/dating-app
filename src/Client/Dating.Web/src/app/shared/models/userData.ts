export interface UserData {
  sub: string;
  name: string;
  email: string;
  email_verified?: boolean;
  preferred_username?: string;
  picture?: string;
  first_name?: string;
  last_name?: string;
}
