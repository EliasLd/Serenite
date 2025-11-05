import { FaSmile, FaChartLine, FaMoon } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

export default function FeaturesHighlightBar() {
  return (
    <>
      <section className="flex flex-col items-center px-4 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
          <div className="flex flex-col items-center p-5 bg-green-900/70 border-r border-neutral-800">
            <FaSmile className="text-2xl text-green-400 mb-2" />
            <span className="text-white font-bold">Reflect</span>
            <span className="text-neutral-400 text-xs mt-1 text-center">Boost your mood</span>
          </div>
          <div className="flex flex-col items-center p-5 bg-emerald-900/60 border-r border-neutral-800">
            <FaChartLine className="text-2xl text-emerald-400 mb-2" />
            <span className="text-white font-bold">Track</span>
            <span className="text-neutral-400 text-xs mt-1 text-center">Celebrate growth</span>
          </div>
          <div className="flex flex-col items-center p-5 bg-yellow-900/40 border-r border-neutral-800">
            <IoTime className="text-2xl text-yellow-300 mb-2" />
            <span className="text-white font-bold">Routine</span>
            <span className="text-neutral-400 text-xs mt-1 text-center">Same time each day</span>
          </div>
          <div className="flex flex-col items-center p-5 bg-teal-900/50">
            <FaMoon className="text-2xl text-teal-300 mb-2" />
            <span className="text-white font-bold">Evenings</span>
            <span className="text-neutral-400 text-xs mt-1 text-center">Reflect each night</span>
          </div>
        </div>
      </section>
    </>
  );
}
