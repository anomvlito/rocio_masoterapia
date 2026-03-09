"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/564575294_18002891396827903_7842854950051613160_n.webp')" }}
      />
      <div className="absolute inset-0 bg-stone-900/60" />

      {/* Overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-stone-400 text-sm font-medium tracking-widest uppercase mb-4">
          La Florida · Santiago
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight mb-6">
          Tu bienestar,
          <br />
          <span className="font-semibold text-stone-300">
            nuestra especialidad
          </span>
        </h1>

        <p className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Centro de masoterapia y rehabilitación kinésica. Masajes
          descontracturantes, deportivos, relajantes y tratamiento kinésico
          personalizado para toda la familia.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/booking"
            className="bg-white text-stone-900 px-8 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors"
          >
            Agendar hora online
          </Link>
          <a
            href="https://wa.me/56942142229"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/40 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-stone-400">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">100+</p>
            <p className="text-xs uppercase tracking-wider">Pacientes</p>
          </div>
          <div className="h-8 w-px bg-stone-600" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">4</p>
            <p className="text-xs uppercase tracking-wider">Especialidades</p>
          </div>
          <div className="h-8 w-px bg-stone-600" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">100%</p>
            <p className="text-xs uppercase tracking-wider">Personalizado</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-stone-400" size={24} />
      </div>
    </section>
  );
}
