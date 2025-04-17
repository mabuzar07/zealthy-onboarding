export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
}

export async function createUser(userData: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create user");
  }

  return await response.json();
}

export async function updateUser(id: number, userData: any) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update user");
  }

  return await response.json();
}

export async function fetchConfig() {
  const response = await fetch(`${API_URL}/config`);
  if (!response.ok) {
    throw new Error("Failed to fetch configuration");
  }
  return await response.json();
}

export async function updateConfig(
  configurations: Array<{ componentType: string; page: number }>
) {
  const response = await fetch(`${API_URL}/config`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ configurations }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update configuration");
  }

  return await response.json();
}
