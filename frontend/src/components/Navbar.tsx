import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import Logo from "../assets/logo.png"
import { VscGithubInverted } from "react-icons/vsc";


export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="fixed top-3 backdrop-blur-sm bg-white/40 items-center rounded-full font-roboto text-sm p-1 flex gap-x-5 justify-between left-1/2 -translate-x-1/2 w-11/12 md:w-96">
      <div className="flex justify-start items-center gap-x-5">
        <Link to="/">
          <img src={Logo} className="w-8 h-8 hover:rotate-12 ease-in-out duration-300" />
        </Link>
        <div className="group">
          <Link to="/content">Explore</Link>
          <div className="bg-teal-500 h-[2px] w-0 group-hover:w-full transition-all duration-300" />
        </div>
      </div>
      {isLoggedIn ?? (
        <Link to="/entries">Diary</Link>
      )}
      <div className="flex justify-end items-center gap-x-2 pr-1">
        {!isLoggedIn ? (
          <>
            <div className="group">
              <Link to="/auth?mode=login">Login</Link>
              <div className="bg-teal-500 h-[2px] w-0 group-hover:w-full transition-all duration-300" />
            </div>
            <Link to="/auth?mode=register" className="rounded-full shadow-sm shadow-sereniteText/50 hover:shadow-none border border-sereniteText hover:bg-sereniteText py-1 px-3 text-black hover:text-white ease-in-out duration-200">Register</Link>
          </>
        ) : (
          <div className="flex items-center gap-x-2">
            <a className="group">
              <Link to="/entries">Diary</Link>
              <div className="bg-teal-500 h-[2px] w-0 group-hover:w-full transition-all duration-300" />
            </a>
            <button onClick={logout} className="rounded-full shadow-sm shadow-sereniteText/50 hover:shadow-none border border-sereniteText hover:bg-sereniteText py-1 px-3 text-black hover:text-white ease-in-out duration-200">Logout</button>
          </div>
        )}
        <Link to="https://github.com/EliasLd/Serenite" >
          <VscGithubInverted className="w-6 h-6 hover:rotate-12 ease-in-out duration-300" />
        </Link>
      </div>
    </nav>
  );
}
