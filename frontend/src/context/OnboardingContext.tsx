import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { OnboardingState } from "../lib/types";

interface OnboardingContextType {
  state: OnboardingState;
  setField: (field: keyof OnboardingState, value: any) => void;
  resetState: () => void;
}

const defaultState: OnboardingState = {
  email: "",
  password: "",
  aboutMe: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  birthdate: "",
  currentStep: 1,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = sessionStorage.getItem("onboardingState");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved onboarding state", e);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    sessionStorage.setItem("onboardingState", JSON.stringify(state));
  }, [state]);

  const setField = (field: keyof OnboardingState, value: any) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const resetState = () => {
    setState(defaultState);
    sessionStorage.removeItem("onboardingState");
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setField,
        resetState,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
