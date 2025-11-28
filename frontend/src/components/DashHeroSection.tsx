import { useAuth } from "../contexts/AuthContext";
import { decodeJWT } from "../utils/decodeJWT";

export default function DashHeroSection() {
  const { token } = useAuth();
  const claims = decodeJWT(token);
  const username = claims?.username || "User";

  // Placeholder positive statement
  const positiveQuote = "Every day is a new opportunity to grow!";

  return (
    <section className="w-full flex flex-col items-center mb-12 px-6">
      <div className="text-4xl font-bold text-sereniteText text-left mb-2">
        Welcome, {username}!
      </div>
      <div
        className="border-l-4 border-sereniteDetail pl-4 ml-2 italic text-lg text-sereniteTextLight"
        style={{ marginTop: "10px" }}
      >
        {positiveQuote}
      </div>
    </section>
  );
}
