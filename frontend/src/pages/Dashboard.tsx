import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DashHeroSection from "../components/DashHeroSection";
import DiaryCTA from "../components/DiaryCTA";
import EntryForm from "../components/EntryForm";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [showEntryForm, setShowEntryForm] = useState(false);
  const { token } = useAuth();
  if (!token) return null;

  function handleAddEntryClick() {
    setShowEntryForm(true);
  }
  function handleFormSuccess() {
    setShowEntryForm(false);
  }
  function handleFormCancel() {
    setShowEntryForm(false);
  }

  return (
    <>
      <Navbar />
      <section className="h-screen bg-sereniteBg flex flex-col items-center overflow-auto">
        <div className="mt-24 w-full">
          <DashHeroSection />
          <DiaryCTA onAddEntry={handleAddEntryClick} />
          {showEntryForm && (
            <EntryForm
              token={token}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}
        </div>
      </section>
    </>
  );
}
