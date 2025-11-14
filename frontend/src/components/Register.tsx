import { useState } from "react";
import ContextButton from "./ContextButton";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      if (!res.ok) {
        setError(await res.text());
      } else {
        setSuccess("Account created!");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div>
      <div className="p-4 border-serenite rounded-lg bg-sereniteDetail max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 my-3 px-5 text-white">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteTextLight rounded-md"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteTextLight rounded-md"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteTextLight rounded-md"
          />
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteTextLight rounded-md"
          />
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-700">{success}</div>}
          <div className="flex justify-center mt-8 w-full">
            <ContextButton type="submit" className="w-full">
              Register
            </ContextButton>
          </div>
        </form>
      </div>
    </div>
  );
}
