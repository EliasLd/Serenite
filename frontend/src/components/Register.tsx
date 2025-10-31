import { useState } from 'react';

export default function Register() {
    const [form, setForm] = useState({
        username:   "",
        email:  "",
        password:   "",
        confirmPassword:    "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:   JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password
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
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-8">
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border p-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full border p-2 rounded" />
            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-700">{success}</div>}
            <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Register</button>
        </form>
    );
}
