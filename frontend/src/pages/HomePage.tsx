import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Zealthy Onboarding</h1>
        <p className="mb-8 text-gray-600">
          This application demonstrates a custom onboarding flow that can be configured by admins.
        </p>

        <div className="space-y-4">
          <Link to="/onboarding/step-one">
            <Button className="w-full sm:w-auto">Start Onboarding</Button>
          </Link>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center">
            <Link to="/admin">
              <Button variant="secondary">Admin Configuration</Button>
            </Link>
            <Link to="/data">
              <Button variant="secondary">View Data</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;