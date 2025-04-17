import React from "react";
import { ComponentType } from "../../lib/types";

interface ComponentConfigProps {
  configurations: Array<{ componentType: ComponentType; page: number }>;
  onConfigChange: (componentType: ComponentType, page: number) => void;
}

const ComponentConfig: React.FC<ComponentConfigProps> = ({
  configurations,
  onConfigChange,
}) => {
  const getPageForComponent = (componentType: ComponentType): number => {
    const config = configurations.find(
      (c) => c.componentType === componentType
    );
    return config?.page || 2;
  };

  const renderComponent = (type: ComponentType) => {
    const page = getPageForComponent(type);
    const componentName =
      type === ComponentType.ABOUT_ME
        ? "About Me"
        : type === ComponentType.ADDRESS
        ? "Address"
        : "Birthdate";

    return (
      <tr key={type} className="border-b">
        <td className="p-3 border">{componentName}</td>
        <td className="p-3 border text-center">
          <input
            type="radio"
            name={`component-${type}`}
            checked={page === 2}
            onChange={() => onConfigChange(type, 2)}
          />
        </td>
        <td className="p-3 border text-center">
          <input
            type="radio"
            name={`component-${type}`}
            checked={page === 3}
            onChange={() => onConfigChange(type, 3)}
          />
        </td>
      </tr>
    );
  };

  return (
    <table className="w-full border-collapse mb-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="text-left p-3 border">Component</th>
          <th className="text-center p-3 border">Page 2</th>
          <th className="text-center p-3 border">Page 3</th>
        </tr>
      </thead>
      <tbody>
        {renderComponent(ComponentType.ABOUT_ME)}
        {renderComponent(ComponentType.ADDRESS)}
        {renderComponent(ComponentType.BIRTHDATE)}
      </tbody>
    </table>
  );
};

export default ComponentConfig;
