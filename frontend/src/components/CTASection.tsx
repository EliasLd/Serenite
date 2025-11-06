export default function CTASection() {
  return (
    <section className="flex flex-col items-center justify-center px-4">
      <h2 className="text-xl md:text-3xl font-bold text-white text-center mb-3">
        Make every day a little brighter
      </h2>
      <p className="text-neutral-300 text-center mb-6 max-w-lg">
        Create your free account and begin reflecting, tracking, and spreading positivity with Serenité.
      </p>
      <a
        href="/register"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-200"
      >
        Get Started
      </a>
    </section>
  );
}
