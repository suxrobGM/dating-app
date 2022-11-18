import {Gender, SexualOrientation} from '@shared/types';

export interface Profile {
  firstName?: string;
  lastName?: string;
  birthdate?: string;
  livingCity?: string;
  gender?: Gender;
  orientation?: SexualOrientation;
  mainPhotoUrl?: string;
}
