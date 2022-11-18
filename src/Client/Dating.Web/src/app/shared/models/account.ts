import {Interest} from './interest';
import {Profile} from './profile';

export interface Account {
  email: string;
  password?: string;
  profile?: Profile;
  interests?: Interest[];
}
