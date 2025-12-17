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
      <div className="text-3xl sm:text-3xl md:text-5xl font-bold text-sereniteText text-left mb-2 w-full max-w-2xl">
        Welcome, {username}!
      </div>
      <div
        className="w-full max-w-xl px-4 sm:px-8 border-l-4 border-sereniteAccent italic text-lg text-sereniteTextLight"
        style={{ marginTop: "10px" }}
      >
        {loading && "Fetching a little positivity..."}
        {!loading && error && (
          <span>{error}</span>
        )}
        {!loading && !error && (
          <span>
            &quot;{quote}&quot;
          </span>
        )}
      </div>
    </section>
  );
}
