import { Link } from "react-router-dom";
import Logo from "./Logo";
import ContextButton from "./ContextButton";
import BurgerMenu from "./BurgerMenu";

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <nav className="bg-sereniteCard py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6">
        <Link to="/">
          <span className="block md:hidden">
            <Logo size="text-2xl" variant="compact" />
          </span>
          <span className="hidden md:block">
            <Logo size="text-2xl" variant="full" />
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-sereniteText font-dmmono">
            About
          </Link>
          {isLoggedIn && (
            <Link to="/entries" className="text-sereniteText font-dmmono">
              Entries
            </Link>
          )}
        </div>
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-sereniteText font-dmmono text-sm">
                Login
              </Link>
              <Link to="/register">
                <ContextButton className="px-4 py-1 text-sm bg-sereniteAccent text-sereniteText">
                  Register
                </ContextButton>
              </Link>
            </>
          ) : null}
        </div>
        <BurgerMenu isLoggedIn={isLoggedIn} />
      </div>
    </nav>
  );
}
