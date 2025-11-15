import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

import backgroundImg from "../assets/auth-bg.jpg";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    setMode(searchParams.get("mode") === "register" ? "register" : "login");
  }, [searchParams]);

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="fixed top-0 left-0 w-full z-10">
          <Navbar isLoggedIn={false} />
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
