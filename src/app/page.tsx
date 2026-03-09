'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const WA_NUMBER = '56942142229';
const WA_TEXT = encodeURIComponent('Hola, quisiera agendar una hora de masaje 💆');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

const servicios = [
  {
    id: 1,
    icon: '💆',
    nombre: 'Masaje Descontracturante',
    descripcion: 'Técnica específica para liberar contracturas musculares acumuladas. Ideal para dolores cervicales, dorsales y lumbares causados por estrés o mala postura.',
    duracion: '60 min',
    precio: '$30.000',
  },
  {
    id: 2,
    icon: '🏃',
    nombre: 'Masaje Deportivo',
    descripcion: 'Diseñado para deportistas activos. Mejora el rendimiento, previene lesiones y acelera la recuperación muscular post-entrenamiento.',
    duracion: '60 min',
    precio: '$35.000',
  },
  {
    id: 3,
    icon: '🌿',
    nombre: 'Masaje Relajante',
    descripcion: 'Técnica suave y profunda que reduce el estrés, alivia la tensión nerviosa y promueve el bienestar general. Ideal para desconectarse del día a día.',
    duracion: '60 min',
    precio: '$25.000',
  },
  {
    id: 4,
    icon: '🩺',
    nombre: 'Tratamiento Kinésico',
    descripcion: 'Evaluación y tratamiento kinésico personalizado por diagnóstico médico. Atención para bebés 👶, adultos y adultos mayores 🧑‍🦳.',
    duracion: '45 min',
    precio: '$40.000',
  },
];

const resenas = [
  {
    nombre: 'Andrea Soto',
    texto: 'Rocío es increíblemente profesional. El masaje descontracturante fue exactamente lo que necesitaba. Salí nueva.',
    estrellas: 5,
  },
  {
    nombre: 'Felipe Morales',
    texto: 'Llevo meses con dolor de espalda y en dos sesiones de kinesiología mejore notablemente. Muy recomendada.',
    estrellas: 5,
  },
  {
    nombre: 'Camila Vega',
    texto: 'El ambiente es relajante y el trato es excelente. El masaje relajante fue top. Ya agendé para el próximo mes.',
    estrellas: 5,
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-stone-800 text-stone-200 text-xs text-center py-2 px-4 tracking-wide">
        MASOY REHABILITACIÓN · La Florida, Santiago · Lun–Vie 9:00–19:00 · Sáb 9:00–14:00
      </div>

      {/* Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 border-b ${scrolled ? 'bg-white border-stone-200 shadow-sm' : 'bg-white border-stone-100'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center">
              <span className="text-white font-bold text-base">M</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm leading-none">Masoy Rehabilitación</p>
              <p className="text-stone-400 text-xs">Masoterapia & Kinesiología</p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Servicios</a>
            <a href="#nosotros" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Nosotros</a>
            <a href="#galeria" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Galería</a>
            <a href="#contacto" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Contacto</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:+${WA_NUMBER}`} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">+56 9 4214 2229</a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Agendar hora
            </a>
          </div>

          {/* Mobile button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-stone-700">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-4 py-5 flex flex-col gap-4">
            {['#servicios', '#nosotros', '#galeria', '#contacto'].map((href) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-stone-700 font-medium text-lg capitalize"
              >
                {href.replace('#', '')}
              </a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center bg-stone-800 text-white font-semibold px-5 py-3 rounded-full"
            >
              Agendar hora por WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/564575294_18002891396827903_7842854950051613160_n.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/80" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-stone-300 text-sm font-medium tracking-[0.3em] uppercase mb-5">
            La Florida · Santiago
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight mb-6">
            Tu bienestar,<br />
            <span className="font-bold text-stone-200">nuestra especialidad</span>
          </h1>
          <p className="text-stone-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Centro de masoterapia y rehabilitación kinésica. Atención personalizada
            para toda la familia en La Florida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold text-base hover:bg-stone-100 transition-all hover:scale-105 shadow-xl"
            >
              Agendar hora online
            </a>
            <a
              href="#servicios"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-medium text-base hover:bg-white/10 transition-colors"
            >
              Ver servicios
            </a>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-10 mt-16 text-stone-300">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-xs uppercase tracking-widest mt-1">Pacientes</p>
            </div>
            <div className="h-10 w-px bg-stone-600" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4</p>
              <p className="text-xs uppercase tracking-widest mt-1">Especialidades</p>
            </div>
            <div className="h-10 w-px bg-stone-600" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">5 ★</p>
              <p className="text-xs uppercase tracking-widest mt-1">Valoración</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 md:py-28 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Lo que ofrecemos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Nuestros Servicios</h2>
            <p className="text-stone-500 mt-4 text-lg max-w-xl mx-auto">
              Técnicas profesionales adaptadas a tus necesidades, con atención personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicios.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-stone-200 rounded-2xl p-7 hover:border-stone-400 hover:shadow-lg transition-all group"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-stone-700">{s.nombre}</h3>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-xl font-bold text-stone-800">{s.precio}</p>
                    <p className="text-xs text-stone-400">{s.duracion}</p>
                  </div>
                </div>
                <p className="text-stone-500 leading-relaxed text-sm">{s.descripcion}</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm font-semibold text-stone-700 border border-stone-300 px-4 py-2 rounded-full hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all"
                >
                  Reservar este servicio →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/616271293_17858492112595349_3059228116870493808_n.webp"
                alt="Rocío en su centro de masajes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase">Sobre nosotros</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                Cuidado real, resultado real.
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                En <strong>Masoy Rehabilitación</strong> combinamos masoterapia y kinesiología bajo un mismo techo.
                Nuestro objetivo es simple: que salgas mejor de como entraste.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Trabajamos con técnicas especializadas y atención totalmente personalizada. Desde deportistas
                que necesitan recuperarse rápido, hasta adultos mayores o bebés que requieren tratamiento kinésico
                por diagnóstico médico. Cada sesión es única porque cada persona lo es.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  '✔ Masoterapeutas y kinesiólogos certificados',
                  '✔ Atención para todas las edades (bebés, adultos, adultos mayores)',
                  '✔ Horarios flexibles, Lun–Sáb',
                  '✔ Ubicación en La Florida, Santiago',
                ].map((item) => (
                  <p key={item} className="text-stone-700 font-medium text-sm">{item}</p>
                ))}
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white font-bold px-7 py-3.5 rounded-full transition-colors self-start text-sm mt-2"
              >
                Reservar mi hora →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="galeria" className="py-4 bg-stone-100">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/564575294_18002891396827903_7842854950051613160_n.webp"
              alt="Centro de masajes"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/616271293_17858492112595349_3059228116870493808_n.webp"
              alt="Sesión de masaje"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="text-center py-8 bg-stone-100">
          <a
            href="https://www.instagram.com/rocio.masoterapia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0m8.5 9.5h-11A3.5 3.5 0 0 1 1 14V6.5A3.5 3.5 0 0 1 4.5 3h15A3.5 3.5 0 0 1 23 6.5V14a3.5 3.5 0 0 1-3.5 3.5z" />
            </svg>
            Ver más en @rocio.masoterapia →
          </a>
        </div>
      </section>

      {/* RESEÑAS */}
      <section className="py-20 md:py-28 bg-stone-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-14 gap-6">
            <div>
              <p className="text-stone-400 text-sm font-semibold tracking-widest uppercase mb-2">Testimonios</p>
              <h2 className="text-4xl font-bold text-white">Lo que dice nuestra comunidad</h2>
            </div>
            <div className="flex items-center gap-4 bg-stone-800 border border-stone-700 px-6 py-4 rounded-2xl">
              <span className="text-5xl font-black text-white">5.0</span>
              <div>
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                <p className="text-stone-400 text-xs mt-1">Google Reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resenas.map((r, i) => (
              <div key={i} className="bg-stone-800 border border-stone-700 rounded-2xl p-6 hover:border-stone-500 transition-colors">
                <div className="text-yellow-400 mb-4">{'★'.repeat(r.estrellas)}</div>
                <p className="text-stone-300 italic leading-relaxed mb-6">"{r.texto}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-stone-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {r.nombre.charAt(0)}
                  </div>
                  <span className="text-white font-semibold text-sm">{r.nombre}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO Y UBICACIÓN */}
      <section id="contacto" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="flex flex-col gap-8">
              <div>
                <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Encuéntranos</p>
                <h2 className="text-4xl font-bold text-stone-900">Visítanos en La Florida</h2>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">📍</div>
                  <div>
                    <p className="font-bold text-stone-900">Dirección</p>
                    <p className="text-stone-500">La Florida, Santiago, Chile</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">📱</div>
                  <div>
                    <p className="font-bold text-stone-900">Teléfono / WhatsApp</p>
                    <a href={WA_LINK} target="_blank" rel="noreferrer" className="text-green-600 font-bold hover:text-green-700 transition-colors">
                      +56 9 4214 2229
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">🕐</div>
                  <div>
                    <p className="font-bold text-stone-900">Horario de atención</p>
                    <p className="text-stone-500">Lunes a Viernes: 9:00 – 19:00</p>
                    <p className="text-stone-500">Sábado: 9:00 – 14:00</p>
                    <p className="text-stone-400 text-sm">Domingo: Cerrado</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0">📸</div>
                  <div>
                    <p className="font-bold text-stone-900">Instagram</p>
                    <a href="https://www.instagram.com/rocio.masoterapia" target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 transition-colors">
                      @rocio.masoterapia
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd58] text-white font-bold py-4 px-8 rounded-full transition-colors text-base shadow-lg shadow-green-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.845L0 24l6.335-1.502A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.031-1.377l-.36-.214-3.761.892.938-3.66-.236-.375A9.818 9.818 0 0 1 2.182 12c0-5.418 4.4-9.818 9.818-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z"/>
                </svg>
                Agendar por WhatsApp
              </a>
            </div>

            {/* Mapa */}
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-stone-200 shadow-xl">
              <iframe
                src="https://maps.google.com/maps?q=La+Florida,+Santiago,+Chile&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-white font-bold">Masoy Rehabilitación</span>
              </div>
              <p className="text-sm text-stone-500 max-w-xs">
                Centro de masoterapia y kinesiología en La Florida, Santiago.
              </p>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
              <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
              <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
            </div>

            <div className="flex flex-col gap-2 text-sm items-end">
              <a href="https://www.instagram.com/rocio.masoterapia" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                @rocio.masoterapia
              </a>
              <a href={`tel:+${WA_NUMBER}`} className="hover:text-white transition-colors">+56 9 4214 2229</a>
            </div>
          </div>

          <div className="border-t border-stone-800 mt-10 pt-6 text-center text-xs text-stone-600">
            © {new Date().getFullYear()} Masoy Rehabilitación. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
