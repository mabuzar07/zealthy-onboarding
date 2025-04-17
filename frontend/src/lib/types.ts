export enum ComponentType {
  ABOUT_ME = "ABOUT_ME",
  ADDRESS = "ADDRESS",
  BIRTHDATE = "BIRTHDATE",
}

export interface User {
  id: number;
  email: string;
  aboutMe?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: string;
  currentStep?: number;
}

export interface ComponentConfig {
  id: number;
  componentType: ComponentType;
  page: number;
}

export interface OnboardingState {
  userId?: number;
  email: string;
  password: string;
  aboutMe: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  birthdate: string;
  currentStep: number;
}
