import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, Lock, LogIn, FileText, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Subjects", path: "/subjects" },
  { name: "PYQs", path: "/pyq" },          // ✅ ADDED
  { name: "Materials", path: "/materials" },
  { name: "About", path: "/about" },
  { name: "Books", path: "/books" },
  { name: "Resources", path: "/resources" }, // ✅ ADD THIS

];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // 🔐 Check admin role
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsAdmin(data.user?.user_metadata?.role === "ADMIN");
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">
              GeoPhysics
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              IIT (ISM) Dhanbad
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* ISM Library */}
          <Link
            to="/ism-library"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
              location.pathname === "/ism-library"
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            ISM Library
          </Link>

          {/* 👑 Admin Link (Only for ADMIN) */}
          {isAdmin && (
            <Link
              to="/admin"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname === "/admin"
                  ? "bg-destructive/10 text-destructive"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-1.5" />
              Login
            </Button>
          </Link>
          <Link to="/login?register=true">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/ism-library"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Lock className="h-3.5 w-3.5" />
              ISM Library
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <Shield className="h-3.5 w-3.5" />
                Admin Panel
              </Link>
            )}

            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/login?register=true" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
