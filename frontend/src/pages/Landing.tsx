import { Link } from "react-router-dom";

import illustration from "../assets/mindfulness-abstract-illustration.png"
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <>
      <Navbar />
      <section className="h-screen bg-sereniteBg flex items-center overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row lg:mx-16 xl:mx-28">
          <div className="pt-20 lg:pt-0 px-8 sm:px-12 md:px-14 lg:px-16 xl:px-24 flex items-center justify-center">
            <div className="flex flex-col gap-y-5 lg:gap-y-8 xl:gap-y-10">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-mulish font-bold text-sereniteText">
                Capture your <span className="text-sereniteAccent">happiest</span> moments, <span className="underline decoration-sereniteAccent font-bold">daily</span>.
              </h1>
              <p className="text-md font-roboto text-gray-500">
                A few words each day can brighten your whole week. Take a moment to remember what made you smile—you're writing the story of your happiness.
              </p>
              <div className="flex flex-row gap-x-2">
                <Link to="/auth?mode=register" className="p-3 bg-sereniteCard rounded-md text-sereniteBg font-bold">Get Started</Link>
                <Link to="/content" className="p-3 text-sereniteCard hover:text-sereniteBg border border-sereniteCard hover:bg-sereniteCard ease-in-out duration-300 rounded-md font-bold">Learn more</Link>
              </div>
              <div className="flex flex-row gap-x-4 items-center font-mulish">
                <div className="flex flex-row gap-x-2 items-center">
                  <div className="rounded-full bg-cyan-500 w-2 h-2" />
                  <p>Go</p>
                </div>
                <div className="flex flex-row gap-x-2 items-center">
                  <div className="rounded-full bg-[#3178C6] w-2 h-2" />
                  <p>TypeScript</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10 lg:mt-0 px-8 lg:px-0">
            <img src={illustration} className="w-full max-w-md lg:max-w-none lg:w-full object-contain" alt="Mindfulness illustration" />
          </div>
        </div>
      </section>
    </>
  )
}
