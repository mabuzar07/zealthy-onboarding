import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./context/OnboardingContext";
import Navigation from "./components/common/Navigation";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import DataPage from "./pages/DataPage";
import StepOnePage from "./pages/onboarding/StepOnePage";
import StepTwoPage from "./pages/onboarding/StepTwoPage";
import StepThreePage from "./pages/onboarding/StepThreePage";
import CompletedPage from "./pages/onboarding/CompletedPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Router>
      <OnboardingProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/data" element={<DataPage />} />
              <Route path="/onboarding/step-one" element={<StepOnePage />} />
              <Route path="/onboarding/step-two" element={<StepTwoPage />} />
              <Route
                path="/onboarding/step-three"
                element={<StepThreePage />}
              />
              <Route path="/onboarding/completed" element={<CompletedPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </OnboardingProvider>
    </Router>
  );
};

export default App;
