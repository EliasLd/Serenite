import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import EntryDayCard from "../components/EntryDayCard";

type Entry = {
  id: number;
  entry_date: string;
  thing_1: string;
  why_1: string;
  thing_2: string;
  why_2: string;
  thing_3: string;
  why_3: string;
};

export default function EntriesPage() {
  const { token } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/entries`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch"))
      .then(data => { setEntries(data); setLoading(false); })
      .catch(e => { setError(String(e)); setLoading(false); });
  }, [token]);

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-sereniteBg px-1 sm:px-10 flex flex-col items-center pt-20">
        <div className="w-full max-w-5xl flex flex-col mb-7 px-6">
          <div className="flex flex-col items-start gap-y-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="mr-2 px-3 py-1 rounded bg-sereniteCard text-sereniteTextLight font-medium hover:bg-sereniteCard/70 transition"
            >
              ← Back
            </button>
            <span className="text-3xl font-bold text-sereniteText">All My <span className="underline decoration-sereniteAccent">Entries</span></span>
          </div>
          <div className="text-lg text-sereniteText font-medium max-w-2xl">
            Here, you can find all your positive reflections and achievements, beautifully organized. Dive in to revisit your happiest moments day by day!
          </div>
        </div>
        {loading ? (
          <div className="text-sereniteTextLight mt-8 text-lg">Loading your entries...</div>
        ) : error ? (
          <div className="text-red-600 mt-8">{error}</div>
        ) : (
          <div className="
            w-full
            max-w-5xl
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
            pb-8 px-4
            ">
            {entries.map(entry => (
              <EntryDayCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
