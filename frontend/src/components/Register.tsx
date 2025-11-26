import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
        navigate("/auth?mode=login");

      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div>
      <div className="p-4 rounded-lg max-w-sm mx-auto
    bg-sereniteDetail/40 
    backdrop-blur-md
    shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6 my-3 px-5 text-sereniteText">
          <div className="mb-2 text-xl font-bold text-center text-sereniteTextLight">
            Create your account and start your journey!
          </div>
          <div className="w-full h-px bg-sereniteCard mb-5" />

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 bg-sereniteTextLight rounded-md"
          />
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
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-2 bg-sereniteTextLight rounded-md"
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
