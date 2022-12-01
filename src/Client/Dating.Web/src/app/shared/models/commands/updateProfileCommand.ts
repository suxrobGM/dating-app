import {Gender, SexualOrientation} from '../../types';

export interface UpdateProfileCommand {
  id: string;
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  livingCity?: string;
  gender?: Gender;
  orientation?: SexualOrientation;
  school?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
}
