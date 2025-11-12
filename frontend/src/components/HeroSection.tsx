export default function HeroSection() {
  return (
    <section className={`w-full flex flex-col items-center justify-center py-8 md:py-10 px-4 sm:px-8 `}>
      <div className="text-center flex flex-col items-center justify-center">
        <h1 className="font-dmmono text-2xl sm:text-3xl md:text-5xl text-sereniteTextLight font-bold mb-3 md:mb-6">
          Start your journey to daily{" "}
          <span className="bg-gradient-to-r from-sereniteBg via-sereniteText to-sereniteText bg-clip-text text-transparent font-bold animate-gradient">
            positivity
          </span>
          .
        </h1>
        <div className="mx-auto h-1 w-24 md:w-24 bg-sereniteText rounded mt-2 md:mt-4" />
      </div>
    </section>
  );
}
