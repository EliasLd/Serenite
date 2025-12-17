import Navbar from "../components/Navbar";
import DashHeroSection from "../components/DashHeroSection";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="bg-sereniteBg min-h-screen flex flex-col items-center pt-16">
        <DashHeroSection />
      </main>
    </>
  )
}
