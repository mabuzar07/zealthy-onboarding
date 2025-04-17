import React from 'react';

interface AboutMeProps {
  value: string;
  onChange: (value: string) => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700 mb-1">
        About Me
      </label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
        placeholder="Tell us about yourself..."
      />
    </div>
  );
};

export default AboutMe;