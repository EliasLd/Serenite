import { useState } from "react";
import { Link } from "react-router-dom";

type BurgerMenuProps = {
  isLoggedIn: boolean;
};

export default function BurgerMenu({ isLoggedIn }: BurgerMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      <button
        className="focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className={`block h-0.5 w-6 bg-sereniteAccent mb-1 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-sereniteAccent mb-1 ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-sereniteAccent ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-sereniteCard rounded shadow-lg z-50 py-2">
          <nav className="flex flex-col gap-2 items-start px-4">
            <Link to="/about" className="text-sereniteText font-dmmono" onClick={() => setOpen(false)}>About</Link>
            {isLoggedIn ? (
              <Link to="/entries" className="text-sereniteText font-dmmono" onClick={() => setOpen(false)}>Entries</Link>
            ) : (
              <>
                <Link to="/login" className="text-sereniteText font-dmmono text-sm" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/register" className="text-sereniteAccent font-dmmono text-sm" onClick={() => setOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
