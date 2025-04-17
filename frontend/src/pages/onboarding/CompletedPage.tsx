import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const CompletedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Registration Complete!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for completing the onboarding process.
          </p>

          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full">Return to Home</Button>
            </Link>

            <Link to="/data">
              <Button variant="secondary" className="w-full">
                View All User Data
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedPage;
