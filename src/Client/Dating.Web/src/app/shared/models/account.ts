import {Gender} from './gender';
import {Interest} from './interest';
import {SexualOrientation} from './sexualOrientation';

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
