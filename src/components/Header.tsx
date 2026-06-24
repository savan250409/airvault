import { useState, useEffect } from "react";
import { Menu, X, LogIn, ShieldCheck, User, ChevronDown } from "lucide-react";
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
    href: "https://admin.airvlt.com/",
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };
  const menuItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    {
      label: "News",
      children: [
        { label: "Insights", href: "/insights" },
        { label: "Expert Talks", href: "/expert-talks" },
      ],
    },
    {
      label: "Utility Tools",
      children: [
        { label: "Weight Calculator", href: "/weight-calculator" },
        { label: "Export Invoice", href: "/export-invoice" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Active for the section, including inner/detail pages (e.g. /insights/:slug).
  // Home stays exact so it isn't active on every route.
  const isActivePath = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname === href || location.pathname.startsWith(href + "/");

  // A parent (News) is active when any of its children is active.
  const isItemActive = (item: NavItem) =>
    item.href ? isActivePath(item.href) : !!item.children?.some((c) => isActivePath(c.href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Notice Ticker */}
      <div className="bg-amber-50 border-b border-amber-200 overflow-hidden py-1">
        <div className="animate-marquee text-xs text-amber-800 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="px-12">
              ⚠️ The ongoing conflict in the Middle East is causing airspace disruptions, potentially delaying shipments and increasing air freight costs substantially. Both new and existing shipments may be affected, with longer delivery times anticipated.
            </span>
          ))}
        </div>
      </div>

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
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {menuItems.map((item) => {
              const isActive = isItemActive(item);

              // Dropdown parent (e.g. News) — opens on hover or click
              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMenu((v) => (v === item.label ? null : item.label))}
                      className={`flex items-center gap-1 whitespace-nowrap text-sm xl:text-base font-medium transition ${
                        isActive ? "text-primary" : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`} />
                    </button>

                    {openMenu === item.label && (
                      <div className="absolute top-full left-0 pt-3 z-50">
                        <div className="w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                          {item.children.map((c) => (
                            <Link
                              key={c.label}
                              to={c.href}
                              onClick={() => setOpenMenu(null)}
                              className={`block px-4 py-2.5 text-sm font-medium transition ${
                                isActivePath(c.href)
                                  ? "bg-primary/5 text-primary"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                              }`}
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.href!}
                  className={`relative whitespace-nowrap text-sm xl:text-base font-medium transition ${
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
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">

            {/* Button */}
            <Button variant="outline-animated" asChild>
              <Link to="/internship">Internship</Link>
            </Button>

            {/* Logos — shown once the container reaches its max width (1200px) */}
            <div className="hidden min-[1200px]:flex items-center gap-2.5 border-l pl-3">
              <img src="/iata_v2.png" className="h-8" />
              <img src="/jctrans.png" className="h-5" />
              <img src="/gla_v2.png" className="h-7" />
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

            {menuItems.map((item) =>
              item.children ? (
                <div key={item.label} className="flex flex-col gap-2">
                  <p className="text-base font-semibold text-gray-900">{item.label}</p>
                  <div className="flex flex-col gap-2 pl-3 border-l-2 border-gray-100">
                    {item.children.map((c) => (
                      <Link
                        key={c.label}
                        to={c.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-base font-medium transition ${
                          isActivePath(c.href) ? "text-primary" : "text-gray-600 hover:text-primary"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.href!}
                  className={`text-base font-medium transition ${
                    isItemActive(item) ? "text-primary" : "text-gray-700 hover:text-primary"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

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