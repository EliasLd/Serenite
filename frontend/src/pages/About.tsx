import Navbar from "../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="h-screen bg-sereniteBg flex items-center overflow-hidden">
        <div className="w-full flex flex-col gap-y-8 lg:gap-y-10 px-6 sm:px-10 md:px-12 lg:px-20 xl:px-32 py-20 md:py-16 lg:py-8 overflow-y-auto max-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            <div className="flex flex-col gap-y-4 text-justify">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mulish font-bold text-sereniteText">
                The Science of <span className="underline decoration-sereniteAccent">Positivity</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-700">
                Research in positive psychology has shown something remarkable: when you take just a few minutes each evening to write down three good things that happened during your day—and reflect on why they happened—you begin to rewire your brain for happiness.  In as little as one week, this simple practice can shift your attention toward the positive moments you might otherwise overlook.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                It's not about ignoring life's challenges or forcing toxic positivity. It's about training your mind to notice the good that's already there.
              </p>
            </div>

            <div className="flex flex-col gap-y-4 text-justify">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mulish font-bold text-sereniteText">
                Your <span className="text-sereniteAccent">Daily</span> Ritual, Simplified
              </h1>
              <p className="text-sm sm:text-base text-gray-700">
                Serenité makes this practice effortless. Each evening, your journal unlocks at a time you choose—creating a gentle, consistent ritual. You'll reflect on three happy moments from your day and briefly note why each one mattered. That's it.  No pressure, no lengthy essays—just mindful reflection in a few sentences.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Over time, your entries become a personal archive of joy: a collection of memories you can revisit whenever you need a reminder of what makes life meaningful. Whether you're browsing by date, exploring patterns, or simply scrolling through past highlights, Serenite helps you see the bigger picture of your happiness.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 items-center max-w-4xl mx-auto pb-8 text-justify">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mulish font-bold text-sereniteText">
              Built for Real Life
            </h1>
            <p className="text-sm sm:text-base text-gray-700">
              We know life gets busy. That's why Serenite is designed to meet you where you are—accessible on any device, with a clean interface that doesn't demand more than a few minutes of your time. The unlock feature ensures you build the habit without feeling overwhelmed, and the simplicity of three entries keeps the practice sustainable, night after night.
            </p>

            <div className="mt-4 flex flex-col items-center gap-y-3">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-mulish font-bold text-sereniteText italic">
                Start today. Start small. Start noticing the good.
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
