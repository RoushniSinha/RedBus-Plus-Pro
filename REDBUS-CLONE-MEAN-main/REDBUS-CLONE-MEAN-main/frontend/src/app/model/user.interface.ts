export interface IUser {
  id?: string;
  name: string;
  email: string;
  googleId?: string;
  age?: number;
  gender?: string;
  dateOfBirth?: string;
  profilePicture?: string;
  languagePref: string;
  themePref: 'light' | 'dark';
  trustScore: number;
}
