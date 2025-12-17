import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setMode(searchParams.get("mode") === "register" ? "register" : "login");
  }, [searchParams]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  })

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-sereniteBg">
        <div className="fixed top-0 left-0 w-full z-10">
          <Navbar />
        </div>
        <div className="w-full max-w-md">
          {mode === "login" ? (
            <>
              <Login />
              <div className="mt-4 text-sm text-center text-sereniteText">
                Don't have an account?
                <Link to="/auth?mode=register" className="text-sereniteCard ml-1 hover:underline">
                  Register
                </Link>
              </div>
            </>
          ) : (
            <>
              <Register />
              <div className="mt-4 text-sm text-center text-sereniteText">
                Already have an account?
                <Link to="/auth?mode=login" className="text-sereniteCard ml-1 hover:underline">
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
