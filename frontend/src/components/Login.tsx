import { useState } from 'react';

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
                headers : { "Content-Type": "application/json"},
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
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-8">
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
            {error && <div className="text-red-600">{error}</div>}
            {success && <div className="text-green-700">{success}</div>}
            <button type="submit" className="bg-blue-600 text-white p-2 w-full rounded">Login</button>
        </form>
    );
}

