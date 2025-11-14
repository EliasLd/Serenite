import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    setMode(searchParams.get("mode") === "register" ? "register" : "login");
  }, [searchParams]);

  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="min-h-screen bg-sereniteBg flex flex-col items-center justify-center px-4">
        <div className="mb-6 text-center">
          {mode === "login" ? (
            <h2 className="text-2xl md:text-3xl font-bold text-sereniteTextLight">
              Welcome back to <span className="text-sereniteDetail underline">Serenité</span>
            </h2>
          ) : (
            <h2 className="text-2xl md:text-3xl font-bold text-sereniteTextLight">
              Bring a little <span className="text-sereniteAccent">light</span> to your day
            </h2>
          )}
        </div>
        <div className="w-full max-w-md">
          {mode === "login" ? (
            <>
              <Login />
              <div className="mt-4 text-sm text-center text-sereniteTextLight">
                Don't have an account?
                <Link to="/auth?mode=register" className="text-sereniteText ml-1 hover:underline">
                  Register
                </Link>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div className="mt-4 text-sm text-center text-sereniteTextLight">
                Already have an account?
                <Link to="/auth?mode=login" className="text-sereniteText ml-1 hover:underline">
                  Sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div >
    </>
  );
}
