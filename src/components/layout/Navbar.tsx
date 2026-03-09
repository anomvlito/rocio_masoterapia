"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const WA_LINK = "https://wa.me/56942142229?text=Hola%2C%20quisiera%20agendar%20una%20hora";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#servicios", label: "Servicios" },
    { href: "/#galeria", label: "Galería" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span
              className={`font-semibold text-lg transition-colors ${
                scrolled ? "text-stone-800" : "text-white"
              }`}
            >
              Masoy Rehabilitación
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-stone-600 ${
                  scrolled ? "text-stone-700" : "text-white hover:text-stone-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+56942142229"
              className={`flex items-center gap-1 text-sm transition-colors ${
                scrolled ? "text-stone-600" : "text-white/80"
              }`}
            >
              <Phone size={14} />
              <span>+56 9 4214 2229</span>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors"
            >
              Agendar hora
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${scrolled ? "text-stone-700" : "text-white"}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-stone-700 hover:text-stone-900 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-stone-100">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-stone-700 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Agendar hora
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
