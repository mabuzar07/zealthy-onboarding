export interface User {
  id: number;
  email: string;
  password: string;
  aboutMe?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  birthdate?: Date;
}

export interface Config {
  id: number;
  page: number;
  components: string[];
}

export interface CreateUserInput {
  email: string;
  password: string;
  aboutMe?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  birthdate?: Date;
}

export interface UpdateConfigInput {
  page: number;
  components: string[];
}
