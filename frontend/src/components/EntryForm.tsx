import { useState } from "react";

export default function EntryForm({
  onSuccess,
  onCancel = () => { },
  token
}: {
  onSuccess?: () => void,
  onCancel?: () => void,
  token: string
}) {
  const [form, setForm] = useState({
    thing1: "",
    why1: "",
    thing2: "",
    why2: "",
    thing3: "",
    why3: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const today = new Date().toISOString().slice(0, 10); // format YYYY-MM-DD

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/entries`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          entry_date: today,
          thing_1: form.thing1,
          why_1: form.why1,
          thing_2: form.thing2,
          why_2: form.why2,
          thing_3: form.thing3,
          why_3: form.why3
        })
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      setLoading(false);
      setForm({ thing1: "", why1: "", thing2: "", why2: "", thing3: "", why3: "" });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to submit entry");
    }
  }

  return (
    <form
      onSubmit={handleSubmit} className="w-full flex flex-col items-center px-4 mt-10">
      <div className="
        w-full
        max-w-2xl
        bg-sereniteBg backdrop-blur-md rounded-xl shadow
        px-4 sm:px-6 lg:px-10 py-6
        flex flex-col gap-6
        border border-sereniteText
      ">
        <div className="text-lg font-bold mb-2 text-center">
          Today's Positive Moments
        </div>
        <div className="w-full h-px bg-sereniteCard mb-5" />
        <div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-3 md:gap-8
            bg-sereniteAccent/30 p-4 rounded-lg
          "
        >
          {[1, 2, 3].map(n => (
            <div key={n} className="flex flex-col gap-1">
              <label className="font-semibold" htmlFor={`thing${n}`}>{`Thing ${n}`}</label>
              <input
                type="text"
                name={`thing${n}`}
                id={`thing${n}`}
                value={form[`thing${n}` as keyof typeof form]}
                onChange={handleChange}
                className="p-2 rounded bg-sereniteTextLight/80 focus:outline-none"
                required
              />
              <label className="font-medium mt-2" htmlFor={`why${n}`}>{`Why did it matter?`}</label>
              <textarea
                name={`why${n}`}
                id={`why${n}`}
                value={form[`why${n}` as keyof typeof form]}
                onChange={handleChange}
                className="p-2 rounded bg-sereniteTextLight/70 focus:outline-none resize-none"
                rows={2}
                required
              />
            </div>
          ))}
        </div>

        {error && <div className="text-red-700 bg-red-100 rounded p-2 text-sm text-center">{error}</div>}

        {/* Actions */}
        <div className="flex w-full gap-4 mt-3 justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 rounded bg-sereniteAccent text-white font-semibold shadow hover:bg-opacity-80 transition text-center max-w-[180px]"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </div>
    </form>
  );
}
