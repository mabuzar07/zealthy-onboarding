import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";
import { fetchConfig, updateUser } from "../../lib/api";
import { ComponentType } from "../../lib/types";
import Button from "../../components/common/Button";
import AboutMe from "../../components/onboarding/AboutMe";
import AddressForm from "../../components/onboarding/AddressForm";
import BirthdatePicker from "../../components/onboarding/BirthdatePicker";

const StepThreePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setField, resetState } = useOnboarding();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!state.userId) {
      navigate("/onboarding/step-one");
      return;
    }

    const loadComponents = async () => {
      try {
        const config = await fetchConfig();
        const page3Components = config
          .filter((c: any) => c.page === 3)
          .map((c: any) => c.componentType);

        setComponents(page3Components);
      } catch (err: any) {
        setError("Failed to load configuration");
      } finally {
        setLoading(false);
      }
    };

    loadComponents();
  }, [navigate, state.userId]);

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);

      if (!state.userId) return;

      const userData = {
        aboutMe: state.aboutMe,
        street: state.street,
        city: state.city,
        state: state.state,
        zip: state.zip,
        birthdate: state.birthdate,
        currentStep: 4,
      };

      await updateUser(state.userId, userData);

      resetState();
      navigate("/onboarding/completed");
    } catch (err: any) {
      setError(err.message || "Failed to update user data");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Final Details</h1>

          {/* Progress indicator */}
          <div className="flex items-center mb-8">
            <div className="flex-1">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div className="mx-2 text-sm text-gray-600">Step 3 of 3</div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Render components based on admin configuration */}
            {components.includes(ComponentType.ABOUT_ME) && (
              <AboutMe
                value={state.aboutMe}
                onChange={(value) => setField("aboutMe", value)}
              />
            )}

            {components.includes(ComponentType.ADDRESS) && (
              <AddressForm
                address={{
                  street: state.street,
                  city: state.city,
                  state: state.state,
                  zip: state.zip,
                }}
                onChange={({ street, city, state: stateValue, zip }) => {
                  setField("street", street);
                  setField("city", city);
                  setField("state", stateValue);
                  setField("zip", zip);
                }}
              />
            )}

            {components.includes(ComponentType.BIRTHDATE) && (
              <BirthdatePicker
                value={state.birthdate}
                onChange={(date) => setField("birthdate", date)}
              />
            )}

            <Button
              onClick={handleComplete}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Registration"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThreePage;
