import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashHeroSection from "../components/DashHeroSection";
import DiaryCTA from "../components/DiaryCTA";
import EntryForm from "../components/EntryForm";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [showEntryForm, setShowEntryForm] = useState(false);
  const { token } = useAuth();
  if (!token) return null;
  const navigate = useNavigate();

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
        <div className="mt-24 w-full max-w-2xl flex flex-col items-center mx-auto">
          <DashHeroSection />
          <DiaryCTA onAddEntry={handleAddEntryClick} />
          {showEntryForm && (
            <EntryForm
              token={token}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          )}
          <div className="flex w-full items-start px-6 sm:px-12 mb-5">
            <button
              className="mt-7 bg-sereniteAccent text-white px-4 py-2 rounded shadow font-semibold hover:bg-opacity-80 transition"
              onClick={() => navigate("/entries")}
            >
              Previous Entries
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
