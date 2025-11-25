import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ContextButton from "./ContextButton";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { login } = useAuth();

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
        const data = await res.json();
        login(data.token);
        setSuccess("Logged in!");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="p-4 rounded-lg max-w-sm mx-auto
    bg-sereniteDetail/40 
    backdrop-blur-md
    shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6 my-3 px-5 text-sereniteText">
        <div className="mb-2 text-xl font-bold text-center text-sereniteTextLight">
          Welcome back!
        </div>
        <div className="w-full h-px bg-sereniteCard mb-5" />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 bg-sereniteTextLight rounded-md"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 bg-sereniteTextLight rounded-md"
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
  );
}
