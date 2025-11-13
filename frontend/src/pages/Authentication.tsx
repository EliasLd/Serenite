import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
        <div className="w-full max-w-md">
          {mode === "login" ? (
            <>
              <Login />
              <div className="mt-4 text-sm text-center text-sereniteText">
                Don't have an account?
                <button
                  className="text-sereniteAccent ml-1 hover:underline"
                  onClick={() => setMode("register")}
                  type="button"
                >
                  Register
                </button>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div className="mt-4 text-sm text-center text-sereniteText">
                Already have an account?
                <button
                  className="text-sereniteAccent ml-1 hover:underline"
                  onClick={() => setMode("login")}
                  type="button"
                >
                  Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
