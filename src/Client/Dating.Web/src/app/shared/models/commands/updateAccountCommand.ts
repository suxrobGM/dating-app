export interface UpdateAccountCommand {
  id: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}
