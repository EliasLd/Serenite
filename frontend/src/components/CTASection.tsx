import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="flex flex-col items-center justify-center px-4">
      <h2 className="text-xl md:text-3xl font-bold text-sereniteTextLight text-center mb-3">
        Make every day a little{' '}
        <span className="text-sereniteText decoration-2">
          brighter
        </span>
      </h2>
      <p className="text-sereniteTextLight text-center mb-6 max-w-lg">
        Create your free account and begin reflecting, tracking, and spreading positivity with Serenité.
      </p>
      <Link
        to="/auth?mode=register"
        className="bg-sereniteAccent hover:bg-sereniteAccent/80 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors ease-in-out duration-200"
      >
        Get Started
      </Link>
    </section>
  );
}
