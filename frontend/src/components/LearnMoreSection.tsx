import { FaEdit, FaChartLine, FaRegSmileBeam } from "react-icons/fa";

export default function LearnMoreSection() {
  return (
    <section
      id="learn-more"
      className="min-h-screen flex flex-col gap-y-10 justify-center items-center bg-neutral-900 px-4 py-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-sereniteText mb-5">
        How does it work?
      </h2>
      <p className="text-neutral-400 text-lg text-left max-w-xl mb-8 border-l-4 border-green-400 pl-4 italic">
        Each evening, Serenité unlocks your journal at the same time—providing the perfect moment to pause and reflect. Write down three positive things that happened and explain why each one made a difference. Over time, you'll build a powerful habit of gratitude and growth.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl w-full">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <FaEdit className="text-4xl text-green-400 mb-4" />
          <h3 className="text-white font-bold mb-2">
            Reflect Each Evening
          </h3>
          <p className="text-neutral-400 mb-4 text-sm">
            Log in and unlock your journaling interface at the same time every night.
          </p>
          {/* Future screenshot */}
          <div className="w-full h-32 bg-neutral-800 rounded-lg flex items-center justify-center">
            <span className="text-neutral-600">[Screenshot]</span>
          </div>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <FaChartLine className="text-4xl text-emerald-400 mb-4" />
          <h3 className="text-white font-bold mb-2">
            Track Your Growth
          </h3>
          <p className="text-neutral-400 mb-4 text-sm">
            See your reflections and progress visualized in your dashboard.
          </p>
          <div className="w-full h-32 bg-neutral-800 rounded-lg flex items-center justify-center">
            <span className="text-neutral-600">[Screenshot]</span>
          </div>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <FaRegSmileBeam className="text-4xl text-yellow-400 mb-4" />
          <h3 className="text-white font-bold mb-2">
            Feel the Positivity
          </h3>
          <p className="text-neutral-400 mb-4 text-sm">
            Experience the benefits of daily positive reflection and gratitude.
          </p>
          <div className="w-full h-32 bg-neutral-800 rounded-lg flex items-center justify-center">
            <span className="text-neutral-600">[Screenshot]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
