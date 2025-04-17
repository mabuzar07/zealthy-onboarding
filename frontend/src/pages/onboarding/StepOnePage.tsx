import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../lib/api";
import { useOnboarding } from "../../context/OnboardingContext";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

const StepOnePage: React.FC = () => {
  const navigate = useNavigate();
  const { state, setField } = useOnboarding();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { email, password } = state;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const user = await createUser({ email, password });

      setField("userId", user.id);
      setField("currentStep", 2);

      navigate("/onboarding/step-two");
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            User Onboarding
          </h1>

          {/* Progress indicator */}
          <div className="flex items-center mb-8">
            <div className="flex-1">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
              </div>
            </div>
            <div className="mx-2 text-sm text-gray-600">Step 1 of 3</div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              value={state.email}
              onChange={(e) => setField("email", e.target.value)}
              required
              placeholder="Enter your email"
            />

            <Input
              id="password"
              label="Password"
              type="password"
              value={state.password}
              onChange={(e) => setField("password", e.target.value)}
              required
              placeholder="Choose a password"
              minLength={6}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Next"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StepOnePage;
