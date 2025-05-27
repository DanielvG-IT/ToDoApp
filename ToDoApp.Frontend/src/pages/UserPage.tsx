import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ToDo = {
  id: string;
  title: string;
  completed: boolean;
};

type UserProfile = {
  name: string;
  email: string;
};

export const UserPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [loading, setLoading] = useState(true);

  // User edit state
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/user/todos")
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
    });
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setEditMode(false);
        // Optionally refresh user info here
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong>{" "}
        {editMode ? (
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        ) : (
          user?.name || "N/A"
        )}
      </div>
      <div>
        <strong>Email:</strong>{" "}
        {editMode ? (
          <Input
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        ) : (
          user?.email || "N/A"
        )}
      </div>
      <div>
        <strong>Status:</strong>{" "}
        {isAuthenticated ? "Authenticated" : "Not Authenticated"}
      </div>
      {editMode ? (
        <div style={{ marginTop: 16 }}>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleCancel}
            style={{ marginLeft: 8 }}
            disabled={saving}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={handleEdit} style={{ marginTop: 16 }}>
          Edit Profile
        </Button>
      )}
      <Button onClick={logout} style={{ marginTop: 16 }}>
        Logout
      </Button>
      <div style={{ marginTop: 24 }}>
        <h3>Your Todos</h3>
        {loading ? (
          <div>Loading...</div>
        ) : todos.length === 0 ? (
          <div>No todos found.</div>
        ) : (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title} {todo.completed ? "✅" : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
