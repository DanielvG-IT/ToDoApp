import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export const UserPage = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!user) return;
    setSaving(true);
    const { data } = await axios.put(
      `${import.meta.env.BACKEND_API_URL}/users/${user.id}`,
      { username }
    );
    localStorage.setItem("user", JSON.stringify(data));
    setSaving(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-2xl">Your Profile</h1>
      <div>
        <label className="block text-sm">Email</label>
        <p className="mt-1">{user?.email}</p>
      </div>
      <div>
        <label className="block text-sm">Name</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="flex space-x-2">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
