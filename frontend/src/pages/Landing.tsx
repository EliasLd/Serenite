import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeatureHighlightBar from "../components/FeatureHighlightBar";
import CTASection from "../components/CTASection";
import LearnMoreSection from "../components/LearnMoreSection";
import { FaChevronDown } from "react-icons/fa";

export default function Landing() {
  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="min-h-screen bg-neutral-900 flex flex-col">
        <main className="flex-1 flex flex-col justify-center items-center w-full">
          <HeroSection />
          <FeatureHighlightBar />
          <CTASection />
          <button
            className="mt-20 flex flex-col items-center animate-bounce focus:outline-none"
            aria-label="Learn how Serenité works"
            onClick={() => {
              const el = document.getElementById("learn-more");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-lg text-neutral-200 font-medium mb-1">
              How does it work?
            </span>
            <FaChevronDown className="text-green-400 text-2xl" />
          </button>
        </main>
      </div>
      <div className="min-h-screen bg-neutral-900 flex flex-col">
        <LearnMoreSection />
      </div>
    </>
  );
}
