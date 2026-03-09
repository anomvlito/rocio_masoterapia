'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const WA_NUMBER = '56942142229';
const WA_TEXT = encodeURIComponent('Hola, quisiera agendar una hora de masaje 💆');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
const BOOKING_LINK = 'https://masoyrehabilitacion.setmore.com';

const servicios = [
  {
    id: 1,
    icon: '🌿',
    nombre: 'Masaje Relajante',
    descripcion:
      'Libera tensiones, alivia contracturas y te reconecta con tu cuerpo. Un espacio para relajarte, desconectar y recargar tu energía.',
    duracion: '60 min',
    precio: '$34.000',
    precioRef: '$37.500',
  },
  {
    id: 2,
    icon: '💆',
    nombre: 'Masaje Descontracturante',
    descripcion:
      'Técnica específica para liberar contracturas musculares acumuladas. Ideal para dolores cervicales, dorsales y lumbares causados por estrés o mala postura.',
    duracion: '60 min',
    precio: '$34.000',
    precioRef: '$37.500',
  },
  {
    id: 3,
    icon: '🏃',
    nombre: 'Masaje Deportivo',
    descripcion:
      'Diseñado para deportistas activos. Mejora el rendimiento, previene lesiones y acelera la recuperación muscular post-entrenamiento.',
    duracion: '60 min',
    precio: '$34.000',
    precioRef: '$37.500',
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
    texto: 'Llevo meses con dolor de espalda y en dos sesiones notablemente mejor. Muy recomendada, trato excelente.',
    estrellas: 5,
  },
  {
    nombre: 'Camila Vega',
    texto: 'El ambiente es relajante y el trato es cálido. El masaje relajante fue top. Ya agendé para el próximo mes.',
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
      <div className="bg-stone-800 text-stone-200 text-xs text-center py-2 px-4 tracking-wide hidden sm:block">
        MASOY REHABILITACIÓN · Froilán Roa #6333, La Florida · Lun–Vie 9:00–18:00 · Sáb–Dom 9:00–14:00
      </div>
      <div className="bg-stone-800 text-stone-200 text-[10px] text-center py-2 px-2 tracking-wide sm:hidden">
        Froilán Roa #6333, La Florida · Lun–Vie 9:00–18:00
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled ? 'bg-white border-stone-200 shadow-sm' : 'bg-white border-stone-100'
        }`}
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="Inicio Masoy Rehabilitación">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-800 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm sm:text-base">M</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-[13px] sm:text-sm leading-none">Masoy Rehabilitación</p>
              <p className="text-stone-400 text-[10px] sm:text-xs mt-0.5">Masoterapia · La Florida</p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Servicios</a>
            <a href="#nosotros" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Nosotros</a>
            <a href="#resenas" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Reseñas</a>
            <a href="#contacto" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Contacto</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:+${WA_NUMBER}`} className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
              +56 9 4214 2229
            </a>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Agendar hora
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-stone-700"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-4 py-5 flex flex-col gap-4">
            {[
              ['#servicios', 'Servicios'],
              ['#nosotros', 'Nosotros'],
              ['#resenas', 'Reseñas'],
              ['#contacto', 'Contacto'],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="text-stone-700 font-medium text-lg">
                {label}
              </a>
            ))}
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center bg-stone-800 text-white font-semibold px-5 py-3 rounded-full"
            >
              Agendar hora online
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
        aria-label="Bienvenida"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/564575294_18002891396827903_7842854950051613160_n.webp')" }}
          role="img"
          aria-label="Centro de masoterapia Masoy Rehabilitación en La Florida"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/65 via-stone-900/55 to-stone-900/80" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-stone-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Froilán Roa #6333 · La Florida, Santiago
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-[1.1] mb-5">
            Libera tensiones,<br className="hidden sm:block" />
            <span className="font-bold text-stone-200 sm:block">reconecta con tu cuerpo</span>
          </h1>
          <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-3 px-2 leading-relaxed">
            Un espacio para relajarte, desconectar y recargar tu energía.
          </p>
          <p className="text-stone-400 text-sm sm:text-base mb-10 px-4">
            Masajes desde <strong className="text-white">$34.000</strong> los 60 min<br className="sm:hidden" /> <span className="hidden sm:inline">·</span> La Florida, Santiago
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 w-full">
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-stone-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-stone-100 transition-all hover:scale-105 shadow-xl"
            >
              Reservar hora online
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border-2 border-white/50 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:bg-white/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <div className="flex flex-row items-center justify-center mt-12 md:mt-16 text-stone-300 divide-x divide-stone-600">
            <div className="text-center px-4 md:px-8">
              <p className="text-2xl md:text-3xl font-bold text-white">$34.000</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest mt-1">60 MIN</p>
            </div>
            <div className="text-center px-4 md:px-8">
              <p className="text-2xl md:text-3xl font-bold text-white">3</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest mt-1">TERAPIAS</p>
            </div>
            <div className="text-center px-4 md:px-8">
              <p className="text-2xl md:text-3xl font-bold text-white">5 ★</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest mt-1">GOOGLE</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 md:py-28 bg-stone-50" aria-label="Nuestros servicios">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Lo que ofrecemos</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Nuestros Servicios</h2>
            <p className="text-stone-500 mt-4 text-lg max-w-2xl mx-auto">
              Técnicas profesionales con atención personalizada. Masajes de 60 minutos desde{' '}
              <strong className="text-stone-800">$34.000</strong>
              <span className="text-stone-400 line-through ml-2 text-sm">$37.500</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicios.map((s) => (
              <article
                key={s.id}
                className="bg-white border border-stone-200 rounded-2xl p-7 hover:border-stone-400 hover:shadow-lg transition-all group"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="text-4xl mb-4" aria-hidden="true">{s.icon}</div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-stone-700 leading-tight" itemProp="name">
                    {s.nombre}
                  </h3>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-xl font-bold text-stone-800">{s.precio}</p>
                    <p className="text-xs text-stone-400 line-through">{s.precioRef}</p>
                    <p className="text-xs text-stone-400">{s.duracion}</p>
                  </div>
                </div>
                <p className="text-stone-500 leading-relaxed text-sm" itemProp="description">
                  {s.descripcion}
                </p>
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm font-semibold text-stone-700 border border-stone-300 px-4 py-2 rounded-full hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all"
                >
                  Reservar →
                </a>
              </article>
            ))}
          </div>

          {/* CTA precio */}
          <div className="mt-12 text-center bg-stone-800 text-white rounded-2xl p-8">
            <p className="text-stone-400 text-sm uppercase tracking-widest mb-2">Precio especial de lanzamiento</p>
            <p className="text-5xl font-black mb-1">$34.000</p>
            <p className="text-stone-400 mb-6">
              60 minutos · Valor referencial{' '}
              <span className="line-through">$37.500</span>
            </p>
            <a
              href={BOOKING_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block sm:inline-block w-full sm:w-auto bg-white text-stone-900 font-bold px-4 sm:px-8 py-3.5 sm:py-3 rounded-full hover:bg-stone-100 transition-colors text-sm sm:text-base break-words"
            >
              Agendar en masoyrehabilitacion.setmore.com
            </a>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 md:py-28 bg-white" aria-label="Sobre nosotros">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/616271293_17858492112595349_3059228116870493808_n.webp"
                alt="Profesional de Masoy Rehabilitación realizando masaje en La Florida"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase">Sobre nosotros</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                Cuidado real,<br />resultado real.
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed italic border-l-4 border-stone-300 pl-4">
                &ldquo;Libera tensiones, alivia contracturas y reconecta con tu cuerpo. Un espacio para relajarte, desconectar y recargar tu energía.&rdquo;
              </p>
              <p className="text-stone-600 leading-relaxed">
                En <strong>Masoy Rehabilitación</strong> somos un equipo de profesionales certificados en masoterapia,
                ubicados en <strong>Froilán Roa #6333, La Florida</strong>. Cada sesión es adaptada
                a tus necesidades, ya sea que busques relajación, alivio de contracturas o recuperación deportiva.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Masoterapeutas certificados',
                  'Masajes desde $34.000 los 60 min',
                  'Agenda online 24/7 en setmore',
                  'Atención Lun–Vie 9:00–18:00 / Sáb–Dom',
                  'Froilán Roa #6333, La Florida, Santiago',
                ].map((item) => (
                  <p key={item} className="text-stone-700 font-medium text-sm flex items-start gap-2">
                    <span className="text-stone-400 shrink-0">✔</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <a
                href={BOOKING_LINK}
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

      {/* GALERÍA */}
      <section id="galeria" className="py-4 bg-stone-100" aria-label="Galería de fotos">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/564575294_18002891396827903_7842854950051613160_n.webp"
              alt="Sesión de masaje en Masoy Rehabilitación La Florida"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/616271293_17858492112595349_3059228116870493808_n.webp"
              alt="Profesional de masoterapia en centro de La Florida"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
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
            📸 Ver más fotos en @rocio.masoterapia →
          </a>
        </div>
      </section>

      {/* RESEÑAS */}
      <section id="resenas" className="py-20 md:py-28 bg-stone-900" aria-label="Testimonios de clientes">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-6">
            <div>
              <p className="text-stone-400 text-sm font-semibold tracking-widest uppercase mb-2">Testimonios</p>
              <h2 className="text-4xl font-bold text-white">Lo que dice nuestra comunidad</h2>
            </div>
            <div
              className="flex items-center gap-4 bg-stone-800 border border-stone-700 px-6 py-4 rounded-2xl"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <span className="text-5xl font-black text-white" itemProp="ratingValue">5.0</span>
              <div>
                <div className="text-yellow-400 text-lg" aria-label="5 estrellas">★★★★★</div>
                <p className="text-stone-400 text-xs mt-1">Google Reviews</p>
                <meta itemProp="reviewCount" content="47" />
                <meta itemProp="bestRating" content="5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resenas.map((r, i) => (
              <article
                key={i}
                className="bg-stone-800 border border-stone-700 rounded-2xl p-6 hover:border-stone-500 transition-colors"
                itemScope
                itemType="https://schema.org/Review"
              >
                <div className="text-yellow-400 mb-4" aria-label={`${r.estrellas} estrellas`}>
                  {'★'.repeat(r.estrellas)}
                </div>
                <p className="text-stone-300 italic leading-relaxed mb-6" itemProp="reviewBody">
                  &ldquo;{r.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-stone-700 rounded-full flex items-center justify-center text-white font-bold text-sm" aria-hidden="true">
                    {r.nombre.charAt(0)}
                  </div>
                  <span className="text-white font-semibold text-sm" itemProp="author">
                    {r.nombre}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO Y UBICACIÓN */}
      <section id="contacto" className="py-20 md:py-28 bg-white" aria-label="Contacto y ubicación">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="flex flex-col gap-7" itemScope itemType="https://schema.org/HealthAndBeautyBusiness">
              <div>
                <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Encuéntranos</p>
                <h2 className="text-4xl font-bold text-stone-900" itemProp="name">
                  Visítanos en La Florida
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">📍</div>
                  <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <p className="font-bold text-stone-900">Dirección</p>
                    <p className="text-stone-600" itemProp="streetAddress">Froilán Roa #6333</p>
                    <p className="text-stone-500 text-sm">
                      <span itemProp="addressLocality">La Florida</span>,{' '}
                      <span itemProp="addressRegion">Santiago</span>,{' '}
                      <span itemProp="addressCountry">Chile</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">📱</div>
                  <div>
                    <p className="font-bold text-stone-900">WhatsApp / Teléfono</p>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 font-bold hover:text-green-700 transition-colors text-lg"
                      itemProp="telephone"
                    >
                      +56 9 4214 2229
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">✉️</div>
                  <div>
                    <p className="font-bold text-stone-900">Email</p>
                    <a
                      href="mailto:Masoyrehabilitacion@gmail.com"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                      itemProp="email"
                    >
                      Masoyrehabilitacion@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">🕐</div>
                  <div>
                    <p className="font-bold text-stone-900">Horario de atención</p>
                    <p className="text-stone-600">Lunes a Viernes: <strong>9:00 – 18:00</strong></p>
                    <p className="text-stone-600">Sábado y Domingo: <strong>9:00 – 14:00</strong></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">🗓️</div>
                  <div>
                    <p className="font-bold text-stone-900">Agenda online</p>
                    <a
                      href={BOOKING_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-stone-900 transition-colors underline"
                    >
                      masoyrehabilitacion.setmore.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <a
                  href={BOOKING_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-stone-800 hover:bg-stone-700 text-white font-bold py-4 px-6 rounded-full transition-colors"
                >
                  Agendar online
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd58] text-white font-bold py-4 px-6 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.845L0 24l6.335-1.502A11.96 11.96 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.031-1.377l-.36-.214-3.761.892.938-3.66-.236-.375A9.818 9.818 0 0 1 2.182 12c0-5.418 4.4-9.818 9.818-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Google Maps - Froilán Roa 6333, La Florida */}
            <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-stone-200 shadow-xl">
              <iframe
                title="Ubicación Masoy Rehabilitación - Froilán Roa 6333, La Florida, Santiago"
                src="https://maps.google.com/maps?q=Froil%C3%A1n+Roa+6333,+La+Florida,+Santiago,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
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
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-white font-bold">Masoy Rehabilitación</span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Centro de masoterapia y rehabilitación en Froilán Roa #6333, La Florida, Santiago.
                Masajes desde $34.000 los 60 min.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Servicios</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Relajante</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Descontracturante</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Deportivo</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li>📍 Froilán Roa #6333, La Florida</li>
                <li>
                  <a href={`tel:+${WA_NUMBER}`} className="hover:text-white transition-colors">
                    📱 +56 9 4214 2229
                  </a>
                </li>
                <li>
                  <a href="mailto:Masoyrehabilitacion@gmail.com" className="hover:text-white transition-colors">
                    ✉️ Masoyrehabilitacion@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/rocio.masoterapia" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    📸 @rocio.masoterapia
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-600">
            <p>© {new Date().getFullYear()} Masoy Rehabilitación. Todos los derechos reservados.</p>
            <p>Masajes en La Florida · Santiago · Chile</p>
          </div>
        </div>
      </footer>
    </>
  );
}
