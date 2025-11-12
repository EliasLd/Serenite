import { FaSmile, FaChartLine, FaMoon } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

export default function FeaturesHighlightBar() {
  return (
    <section className="flex flex-col items-center px-4 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
        <div className="flex flex-col items-center p-5 bg-sereniteFeature border-r border-sereniteDetail">
          <FaSmile className="text-2xl text-sereniteText mb-2" />
          <span className="text-sereniteText font-bold">Reflect</span>
          <span className="text-sereniteDetail text-xs mt-1 text-center">
            Boost your mood
          </span>
        </div>
        <div className="flex flex-col items-center p-5 bg-sereniteCard md:border-r border-sereniteDetail">
          <FaChartLine className="text-2xl text-sereniteDetail mb-2" />
          <span className="text-sereniteText font-bold">Track</span>
          <span className="text-sereniteDetail text-xs mt-1 text-center">
            Celebrate growth
          </span>
        </div>
        <div className="flex flex-col items-center p-5 bg-sereniteAccent border-r border-sereniteDetail">
          <IoTime className="text-2xl text-sereniteText mb-2" />
          <span className="text-sereniteText font-bold">Routine</span>
          <span className="text-sereniteDetail text-xs mt-1 text-center">
            Same time each day
          </span>
        </div>
        <div className="flex flex-col items-center p-5 bg-sereniteDetail">
          <FaMoon className="text-2xl text-sereniteAccent mb-2" />
          <span className="text-sereniteTextLight font-bold">Evenings</span>
          <span className="text-sereniteCard text-xs mt-1 text-center">
            Reflect each night
          </span>
        </div>
      </div>
    </section>
  );
}
