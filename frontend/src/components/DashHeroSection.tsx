import { useAuth } from "../contexts/AuthContext";
import { decodeJWT } from "../utils/decodeJWT";
import { useDailyQuote } from "../utils/useDailyQuote";

export default function DashHeroSection() {
  const { token } = useAuth();
  const claims = decodeJWT(token);
  const username = claims?.username || "User";

  const { quote, loading, error } = useDailyQuote();

  return (
    <section className="w-full flex flex-col gap-y-5 items-center mb-12 px-6">
      <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-sereniteText text-left mb-2">
        Welcome, {username}!
      </div>
      <div
        className="border-l-4 border-sereniteAccent pl-4 ml-2 italic text-lg text-sereniteTextLight"
        style={{ marginTop: "10px" }}
      >
        {loading && "Fetching a little positivity..."}
        {!loading && error && (
          <span>
            {error}
          </span>
        )}
        "
        {!loading && !error && quote}
        "
      </div>
    </section>
  );
}
