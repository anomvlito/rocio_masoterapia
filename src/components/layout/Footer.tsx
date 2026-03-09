import Link from "next/link";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-stone-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <span className="text-white font-semibold text-lg">
                Masoy Rehabilitación
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Centro especializado en masoterapia y rehabilitación. Cuidamos tu
              bienestar físico con técnicas profesionales y atención
              personalizada.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.instagram.com/rocio.masoterapia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#servicios"
                  className="hover:text-white transition-colors"
                >
                  Masaje Descontracturante
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicios"
                  className="hover:text-white transition-colors"
                >
                  Masaje Deportivo
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicios"
                  className="hover:text-white transition-colors"
                >
                  Masaje Relajante
                </Link>
              </li>
              <li>
                <Link
                  href="/#servicios"
                  className="hover:text-white transition-colors"
                >
                  Tratamiento Kinésico
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-stone-500 shrink-0" />
                <span>La Florida, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-stone-500 shrink-0" />
                <a
                  href="tel:+56942142229"
                  className="hover:text-white transition-colors"
                >
                  +56 9 4214 2229
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 text-stone-500 shrink-0" />
                <div>
                  <p>Lun–Vie: 9:00 – 19:00</p>
                  <p>Sáb: 9:00 – 14:00</p>
                </div>
              </li>
            </ul>
            <Link
              href="/booking"
              className="inline-block mt-4 bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Agendar hora
            </Link>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-6 text-center text-xs text-stone-500">
          <p>© {currentYear} Masoy Rehabilitación. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
