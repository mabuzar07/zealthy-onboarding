import React from "react";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onChange }) => {
  const handleChange =
    (field: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...address,
        [field]: e.target.value,
      });
    };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Address Information</h3>

      <div>
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Street Address
        </label>
        <input
          type="text"
          id="street"
          value={address.street}
          onChange={handleChange("street")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <input
          type="text"
          id="city"
          value={address.city}
          onChange={handleChange("city")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label
          htmlFor="state"
          className="block text-sm font-medium text-gray-700"
        >
          State
        </label>
        <input
          type="text"
          id="state"
          value={address.state}
          onChange={handleChange("state")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label
          htmlFor="zip"
          className="block text-sm font-medium text-gray-700"
        >
          Zip Code
        </label>
        <input
          type="text"
          id="zip"
          value={address.zip}
          onChange={handleChange("zip")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </div>
  );
};

export default AddressForm;
