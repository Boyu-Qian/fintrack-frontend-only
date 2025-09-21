import { forwardRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-transparent-png.png";

interface NaviBarProps {
  scrolled: boolean;
}

const NaviBar = forwardRef<HTMLElement, NaviBarProps>(({ scrolled }, ref) => {
  return (
    <nav
      ref={ref}
      className={`z-20 fixed top-0 left-1/2 -translate-x-1/2 container mt-4 rounded-xl ${
        scrolled ? "bg-gray-300/50" : "bg-transparent"
      } hover:bg-white/50 flex items-center justify-between px-2 py-1 transition-all duration-300 `}
    >
      <div className="flex items-center justify-between mr-auto">
        <img src={Logo} alt="Fintrack Logo" className="h-16 w-auto" />
        <Link
          to="/dashboard"
          className="relative text-sm text-black navbar-btn mx-1"
        >
          Dashboard
        </Link>
        <Link
          to="/report"
          className="relative text-sm text-black navbar-btn mx-1"
        >
          Report
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <Link
          to="/login"
          className="relative text-sm bg-[#F5F7EE] hover:bg-[#BCCFEF] px-2 md:px-4 py-1 rounded-md text-black mx-1 md:mx-2"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="relative text-white bg-black rounded-md px-2 md:px-4 py-1 text-sm text-black mx-1 md:mx-2"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
});

export default NaviBar;
