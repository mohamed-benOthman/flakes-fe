/*
export class Profile {
  username: string = 'perfectJohn';
  firstName: string = 'John';
  lastName: string = 'Doe';
  phone: string = '062232323';
  zipCode: string = '75002';
  departments: Array<string> = ['Paris', 'Hauts de seine'];
  business: string = 'Beauté';
  emailAdress: string = 'test@gmail.com';
  expertise: Array<string> = ['Manucure'];
  slogan: string = 'Le client est roi';
  photosUrl = Array<string>;
}
*/

export interface Profile {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  zipCode: string;
  departments: string[];
  business: string;
  emailAdress: string;
  expertise: Array<string>;
  slogan: string;
  photosUrl: string[];
}
