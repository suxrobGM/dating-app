import {Gender, SexualOrientation} from '@shared/types';

export interface Profile {
  id?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  livingCity?: string;
  gender?: Gender;
  orientation?: SexualOrientation;
  mainPhotoUrl?: string;
  school?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
}
