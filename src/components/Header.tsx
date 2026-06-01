import { useState, useEffect } from "react";
import { Menu, X, LogIn, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const loginLinks = [
  {
    label: "Admin",
    href: "https://admin.airvlt.com",
    Icon: ShieldCheck,
  },
  {
    label: "Customer",
    href: "http://online.airvlt.com/",
    Icon: User,
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container-custom px-4">
        <div className="flex items-center justify-between py-3">

          {/* ✅ Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/airvlt_logo_v3.png"
              alt="Logo"
               className="h-16 sm:h-16 lg:h-16 w-auto object-contain"

            />
          </Link>

          {/* ✅ Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative text-sm xl:text-base font-medium transition ${
                    isActive
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ✅ Right Section Desktop */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Button */}
            <Button variant="outline-animated" asChild>
              <Link to="/internship">Internship</Link>
            </Button>

            {/* Logos */}
            <div className="flex items-center gap-3 border-l pl-4">
              <img src="/iata_v2.png" className="h-10" />
              <img src="/jctrans.png" className="h-6" />
              <img src="/gla_v2.png" className="h-8" />
            </div>

            {/* Login Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="gradient-primary" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                {loginLinks.map(({ label, href, Icon }) => (
                  <DropdownMenuItem key={label} asChild className="cursor-pointer">
                    <a href={href} rel="noopener noreferrer" className="flex items-center gap-2 py-1.5">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="font-medium">{label}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] py-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-4 border-t pt-4">

            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4">

              <Button variant="outline-animated" asChild>
                <Link to="/internship">Internship</Link>
              </Button>

              {/* Login Options */}
              <div className="border-t pt-3">
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <LogIn className="w-4 h-4" /> Login
                </p>
                <div className="flex flex-col gap-2">
                  {loginLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 rounded-md border p-3 hover:border-primary hover:bg-primary/5 transition"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium text-gray-800">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </nav>
        </div>

      </div>
    </header>
  );
};

export default Header;