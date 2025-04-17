import React, { useEffect, useState } from "react";
import { fetchConfig, updateConfig } from "../lib/api";
import { ComponentType } from "../lib/types";
import Button from "../components/common/Button";
import ComponentConfig from "../components/admin/ComponentConfig";

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [configurations, setConfigurations] = useState<
    Array<{ componentType: ComponentType; page: number }>
  >([]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchConfig();
        setConfigurations(data);
      } catch (err: any) {
        setError("Failed to load configuration");
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handlePageChange = (componentType: ComponentType, page: number) => {
    const updatedConfig = configurations.map((config) =>
      config.componentType === componentType ? { ...config, page } : config
    );
    setConfigurations(updatedConfig);
  };

  const handleSave = async () => {
    try {
      const page2Components = configurations.filter((c) => c.page === 2);
      const page3Components = configurations.filter((c) => c.page === 3);

      if (page2Components.length === 0 || page3Components.length === 0) {
        setError("Each page must have at least one component");
        return;
      }

      await updateConfig(configurations);
      setSuccess("Configuration saved successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to save configuration");
      setSuccess(null);
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Configuration</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Configure Onboarding Components
        </h2>
        <p className="mb-6 text-gray-600">
          Select which page each component should appear on. Each page must have
          at least one component.
        </p>

        <ComponentConfig
          configurations={configurations}
          onConfigChange={handlePageChange}
        />

        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Configuration</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
