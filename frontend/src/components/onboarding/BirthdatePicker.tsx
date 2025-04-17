import React from "react";

interface BirthdatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const BirthdatePicker: React.FC<BirthdatePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="birthdate"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Birthdate
      </label>
      <input
        type="date"
        id="birthdate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      />
    </div>
  );
};

export default BirthdatePicker;
