import React, { useEffect, useState } from "react";
import { fetchUsers } from "../lib/api";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import DataTable from "../components/data/DataTable";
import { User } from "../lib/types";

const DataPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err: any) {
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
          {error}
        </div>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Data</h1>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <DataTable users={users} />
      </div>
    </div>
  );
};

export default DataPage;
