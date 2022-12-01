import {Gender, SexualOrientation} from '../../types';

export interface CreateAccountCommand {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  livingCity: string;
  gender: Gender;
  orientation: SexualOrientation;
  mainPhotoUrl: string;
}
