import { useState } from "react";
import ContextButton from "./ContextButton";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError(await res.text());
      } else {
        setSuccess("Logged in!");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div>
      <div className="p-4 border-sereniteText rounded-lg bg-sereniteCard max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 my-3 px-5 text-white">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteCard"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-b border-b-zinc-600 p-2 bg-sereniteCard"
          />
          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-700">{success}</div>}
          <div className="flex justify-center mt-8 w-full">
            <ContextButton type="submit" className="w-full">
              Login
            </ContextButton>
          </div>
        </form>
      </div>
      <div className="mt-6 text-xs text-center text-sereniteText">
        Don't have an account?
        <a href="#" className="text-sereniteAccent ml-1 hover:underline">
          Register
        </a>
      </div>
    </div>
  );
}
