import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

// Define a reusable hook for fetching a daily positive quote.

type DailyQuote = {
  quote: string | null;
  author: string | null;
  loading: boolean;
  error: string | null;
}

export function useDailyQuote(): DailyQuote {
  const [quote, setQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  useEffect(() => {
    const storageKeyQuote = "dailyPositiveQuote";
    const storageKeyDate = "dailyPositiveQuoteDay";
    const storageKeyAuthor = "dailyPositiveQuoteAuthor";
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    const savedQuote = localStorage.getItem(storageKeyQuote);
    const savedDate = localStorage.getItem(storageKeyDate);
    const savedAuthor = localStorage.getItem(storageKeyAuthor);

    if (savedQuote && savedDate == today) {
      setQuote(savedQuote);
      setAuthor(savedAuthor || null);
      setLoading(false);
      return;
    }

    // Fetch a new quote
    fetch(`${import.meta.env.VITE_API_URL}/api/positive-quote`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || !data.length) {
          throw new Error("No quote returned");
        }
        setQuote(data[0].q || null);
        setAuthor(data[0].a || null);
        localStorage.setItem(storageKeyQuote, data[0].q || "");
        localStorage.setItem(storageKeyAuthor, data[0].a || "");
        localStorage.setItem(storageKeyDate, today);
      })
      .catch(() => {
        setError("Could not fetch quote, sorry :(");
        // Show cached quote & author if still available
        setQuote(savedQuote || null);
        setAuthor(savedAuthor || null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { quote, author, loading, error };
}
