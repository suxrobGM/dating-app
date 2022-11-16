import {Gender, SexualOrientation} from '../types';
import {Interest} from './interest';

export interface Account {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  birthdate: string;
  gender: Gender;
  orientation: SexualOrientation;
  interests: Interest[];
}
