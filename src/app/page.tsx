'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SetmoreButton } from '@/components/ui/SetmoreButton';

const WA_NUMBER = '56942142229';
const waLink = (texto: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`;
const WA_LINK = waLink('Hola Rocío! Quisiera agendar un masaje a domicilio 💆 ¿Tienes disponibilidad?');

const servicios = [
  {
    id: 1,
    icon: '🌿',
    nombre: 'Masaje Relajante',
    descripcion:
      'Libera tensiones, alivia el estrés y te reconecta con tu cuerpo. Técnica suave y envolvente que calma el sistema nervioso y restaura tu energía.',
    waTexto: 'Hola Rocío! Me gustaría agendar un Masaje Relajante a domicilio 🌿 ¿Tienes disponibilidad?',
  },
  {
    id: 2,
    icon: '💆',
    nombre: 'Masaje Descontracturante',
    descripcion:
      'Trabaja en profundidad para liberar contracturas musculares. Ideal para dolores cervicales, dorsales y lumbares causados por estrés o mala postura.',
    waTexto: 'Hola Rocío! Me gustaría agendar un Masaje Descontracturante a domicilio 💆 Tengo molestias musculares y quisiera más información.',
  },
  {
    id: 3,
    icon: '🏃',
    nombre: 'Masaje Deportivo',
    descripcion:
      'Diseñado para deportistas activos. Mejora el rendimiento, previene lesiones y acelera la recuperación muscular post-entrenamiento.',
    waTexto: 'Hola Rocío! Me gustaría agendar un Masaje Deportivo a domicilio 🏃 ¿Tienes disponibilidad?',
  },
];

const precios = [
  {
    duracion: '60 minutos',
    personas: '1 persona',
    precio: '$42.000',
    waTexto: 'Hola Rocío! Me gustaría agendar un masaje de 60 minutos para 1 persona 💆 ¿Tienes disponibilidad?',
  },
  {
    duracion: '90 minutos',
    personas: '1 persona',
    precio: '$53.000',
    waTexto: 'Hola Rocío! Me gustaría agendar un masaje de 90 minutos para 1 persona 💆 ¿Tienes disponibilidad?',
  },
  {
    duracion: '60 minutos',
    personas: '2 personas',
    precio: '$80.000',
    waTexto: 'Hola Rocío! Me gustaría agendar un masaje de 60 minutos para 2 personas 👫 ¿Tienes disponibilidad?',
  },
  {
    duracion: '90 minutos',
    personas: '2 personas',
    precio: '$95.000',
    waTexto: 'Hola Rocío! Me gustaría agendar un masaje de 90 minutos para 2 personas 👫 ¿Tienes disponibilidad?',
  },
];

const productos = [
  {
    id: 1,
    nombre: 'Crema Armonizante',
    presentacion: '450 ml',
    categoria: 'Masaje',
    descripcion: 'Crema deslizante de uso profesional. Hidrata profundamente y facilita la técnica de masaje.',
    imagen: '/images/productos/crema-masajes-armonizante.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema de Masajes Armonizante (450ml) 🙌 ¿La tienes disponible?',
  },
  {
    id: 2,
    nombre: 'Crema L-Reductora',
    presentacion: '450 ml',
    categoria: 'Reductor',
    descripcion: 'Reduce medidas y combate la grasa localizada. Ideal para abdomen, caderas y muslos.',
    imagen: '/images/productos/crema-l-reductora.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema L-Reductora (450ml) 🙌 ¿La tienes disponible?',
  },
  {
    id: 3,
    nombre: 'Crema Oxireductora',
    presentacion: '450 ml',
    categoria: 'Reductor',
    descripcion: 'Activa la circulación y oxigena los tejidos para potenciar el efecto reductor del masaje.',
    imagen: '/images/productos/crema-oxireductora-nobg.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema Oxireductora (450ml) 🙌 ¿La tienes disponible?',
  },
  {
    id: 4,
    nombre: 'Crema Lipo-Reductora',
    presentacion: 'Dr. Fontboté',
    categoria: 'Reductor',
    descripcion: 'Fórmula profesional que favorece la eliminación de grasa acumulada con uso constante.',
    imagen: '/images/productos/crema-lipo-reductora-fontbote.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema Lipo-Reductora Dr. Fontboté 🙌 ¿La tienes disponible?',
  },
  {
    id: 5,
    nombre: 'Crema Celu-Stop',
    presentacion: '450 ml',
    categoria: 'Firmeza',
    descripcion: 'Combate la celulitis y mejora la textura de la piel, dejándola más lisa y uniforme.',
    imagen: '/images/productos/crema-celu-stop-nobg.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema Celu-Stop (450ml) 🙌 ¿La tienes disponible?',
  },
  {
    id: 6,
    nombre: 'Crema Reafirmante Plus',
    presentacion: '450 ml',
    categoria: 'Firmeza',
    descripcion: 'Reafirma y tonifica la piel flácida. Complemento ideal post-masaje para mantener resultados.',
    imagen: '/images/productos/crema-reafirmante-plus.png',
    waTexto: 'Hola Rocío! Me gustaría consultar disponibilidad de la Crema Reafirmante Plus (450ml) 🙌 ¿La tienes disponible?',
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX;
    scrollStartX.current = carouselRef.current.scrollLeft;
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.userSelect = 'none';
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    const dx = e.pageX - dragStartX.current;
    carouselRef.current.scrollLeft = scrollStartX.current - dx;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (carouselRef.current) {
      carouselRef.current.style.cursor = 'grab';
      carouselRef.current.style.userSelect = '';
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-stone-800 text-stone-200 text-xs text-center py-2 px-4 tracking-wide hidden sm:block">
        Masaje a domicilio en Santiago · Lun–Vie 09:00–20:00 · Sáb 10:00–13:00 · WhatsApp +56 9 4214 2229
      </div>
      <div className="bg-stone-800 text-stone-200 text-[10px] text-center py-2 px-2 tracking-wide sm:hidden">
        Masaje a domicilio · Lun–Vie 09:00–20:00 · Sáb 10:00–13:00
      </div>

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled ? 'bg-white border-stone-200 shadow-sm' : 'bg-white border-stone-100'
        }`}
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 sm:gap-3 shrink-0" aria-label="Inicio Rocío Masoterapia">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-800 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm sm:text-base">R</span>
            </div>
            <div>
              <p className="font-bold text-stone-900 text-[13px] sm:text-sm leading-none">Rocío Masoterapia</p>
              <p className="text-stone-400 text-[10px] sm:text-xs mt-0.5">Masaje a domicilio · Santiago</p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#servicios" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Servicios</a>
            <a href="#precios" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Precios</a>
            <a href="#productos" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Productos</a>
            <a href="#sobre-mi" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Sobre mí</a>
            <a href="#contacto" className="text-sm text-stone-600 hover:text-stone-900 font-medium transition-colors">Contacto</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
              +56 9 4214 2229
            </a>
            <SetmoreButton className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer">
              Agendar hora
            </SetmoreButton>
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
              ['#precios', 'Precios'],
              ['#productos', 'Productos'],
              ['#sobre-mi', 'Sobre mí'],
              ['#contacto', 'Contacto'],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className="text-stone-700 font-medium text-lg">
                {label}
              </a>
            ))}
            <SetmoreButton className="mt-2 w-full text-center bg-stone-800 text-white font-semibold px-5 py-3 rounded-full cursor-pointer">
              Agendar hora
            </SetmoreButton>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center overflow-hidden"
        aria-label="Bienvenida"
      >
        {/* Video de fondo con fallback a imagen */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/videos/masaje-web.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900/90" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-stone-300 text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Masaje a domicilio · Santiago
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-light text-white leading-[1.1] mb-5"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
          >
            La experiencia de bienestar<br className="hidden sm:block" />
            <span className="font-bold text-stone-200 sm:block">en tu propio hogar</span>
          </h1>
          <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-3 px-2 leading-relaxed">
            Llevo camilla profesional, toallas, música y aromaterapia para que vivas una experiencia de bienestar y renovación en la calidez de tu hogar.
          </p>
          <p className="text-stone-400 text-sm sm:text-base mb-10 px-4">
            Desde <strong className="text-white">$42.000</strong> los 60 min<br className="sm:hidden" /> <span className="hidden sm:inline">·</span> También para 2 personas
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 w-full">
            <SetmoreButton className="w-full sm:w-auto bg-white text-stone-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-stone-100 transition-all hover:scale-105 shadow-xl cursor-pointer">
              Reservar hora
            </SetmoreButton>
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
            <div className="text-center px-5 md:px-10">
              <p className="text-2xl md:text-3xl font-bold text-white">$42.000</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest mt-1 text-stone-400">60 min · 1 persona</p>
            </div>
            <div className="text-center px-5 md:px-10">
              <p className="text-2xl md:text-3xl font-bold text-white">$53.000</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest mt-1 text-stone-400">90 min · 1 persona</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="py-20 md:py-28 bg-stone-50" aria-label="Nuestros servicios">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Lo que ofrezco</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Tipos de Masaje</h2>
            <p className="text-stone-500 mt-4 text-lg max-w-2xl mx-auto">
              Masaje a domicilio en Santiago. Llevo todo lo necesario para tu comodidad.
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
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-stone-700 leading-tight mb-3" itemProp="name">
                  {s.nombre}
                </h3>
                <p className="text-stone-500 leading-relaxed text-sm" itemProp="description">
                  {s.descripcion}
                </p>
                <a
                  href={waLink(s.waTexto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-5 text-sm font-semibold text-stone-700 border border-stone-300 px-4 py-2 rounded-full hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all"
                >
                  Agendar este masaje →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="py-20 md:py-28 bg-white" aria-label="Precios de masaje a domicilio">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Tarifas</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Precios</h2>
            <p className="text-stone-500 mt-4 text-base max-w-xl mx-auto">
              Precios directos, sin sorpresas. El traslado y todos los elementos están incluidos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {precios.map((p) => (
              <a
                key={`${p.personas}-${p.duracion}`}
                href={waLink(p.waTexto)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-stone-50 border border-stone-200 rounded-2xl p-6 flex items-center justify-between hover:border-stone-400 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-bold text-stone-900 text-base">{p.personas}</p>
                  <p className="text-stone-500 text-sm">{p.duracion}</p>
                  <p className="text-stone-400 text-xs mt-1 group-hover:text-stone-600 transition-colors">Agendar →</p>
                </div>
                <p className="text-2xl font-black text-stone-800">{p.precio}</p>
              </a>
            ))}
          </div>

          <div className="bg-stone-800 text-white rounded-2xl p-8 text-center">
            <p className="text-stone-300 text-sm mb-2">Camilla · Toallas · Música · Aromaterapia</p>
            <p className="text-stone-100 font-semibold text-lg mb-1">Todo incluido en el precio</p>
            <p className="text-stone-400 text-sm mb-6">
              Las reservas solo se pueden cancelar o reagendar con{' '}
              <strong className="text-stone-200">24 horas de anticipación</strong>.
            </p>
            <SetmoreButton className="block sm:inline-block w-full sm:w-auto bg-white text-stone-900 font-bold px-8 py-3.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer">
              Agendar hora ahora
            </SetmoreButton>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" className="py-20 md:py-28 bg-stone-50" aria-label="Sobre Rocío Abarzúa">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/gato.jpg.jpeg"
                alt="Rocío Abarzúa Torrealba - Maseoterapeuta a domicilio en Santiago"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase">Sobre mí</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
                Rocío Abarzúa<br />Torrealba
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed italic border-l-4 border-stone-300 pl-4">
                &ldquo;Masaje a domicilio en Santiago: llevo todo lo necesario para que vivas una experiencia de bienestar y renovación en la calidez de tu hogar.&rdquo;
              </p>
              <p className="text-stone-600 leading-relaxed">
                Soy maseoterapeuta profesional y llevo el servicio directamente a tu hogar en Santiago. Cada sesión incluye camilla, toallas, música relajante y aromaterapia. Solo necesitas disponer de un espacio cómodo; yo me encargo del resto.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Maseoterapeuta certificada',
                  'Camilla, toallas, música y aromaterapia incluidos',
                  'Para 1 o 2 personas',
                  'Lun–Vie 09:00–20:00 · Sáb 10:00–13:00',
                  'Agenda por WhatsApp',
                ].map((item) => (
                  <p key={item} className="text-stone-700 font-medium text-sm flex items-start gap-2">
                    <span className="text-stone-400 shrink-0">✔</span>
                    <span>{item}</span>
                  </p>
                ))}
              </div>
              <SetmoreButton className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-white font-bold px-7 py-3.5 rounded-full transition-colors self-start text-sm mt-2 cursor-pointer">
                Reservar mi hora →
              </SetmoreButton>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-20 md:py-28 bg-white overflow-hidden" aria-label="Productos disponibles">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Para llevar a casa</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Productos</h2>
              <p className="text-stone-500 mt-3 text-base max-w-lg">
                Cremas profesionales para complementar tu tratamiento y mantener los resultados en casa.
              </p>
            </div>
            <p className="text-stone-400 text-sm hidden sm:block shrink-0">
              ← Desliza para ver más →
            </p>
          </div>
        </div>

        {/* Banda de scroll con fade en los bordes */}
        <div className="relative">
          {/* Fade izquierda */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          {/* Fade derecha */}
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-6 px-4 md:px-16 scroll-smooth"
            style={{ cursor: 'grab', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {productos.map((p) => (
              <div
                key={p.id}
                className="group flex-shrink-0 w-56 md:w-64 bg-stone-50 border border-stone-200 rounded-2xl p-5 hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col"
                draggable={false}
              >
                {/* Badge categoría */}
                <div className="mb-4">
                  <span className="inline-block bg-stone-800 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase">
                    {p.categoria}
                  </span>
                </div>

                {/* Imagen del producto */}
                <div className="relative h-40 md:h-44 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-stone-100/50 to-transparent rounded-xl" />
                  <Image
                    src={p.imagen}
                    alt={`${p.nombre} ${p.presentacion}`}
                    width={160}
                    height={160}
                    className="relative object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300 w-auto h-full max-h-40 md:max-h-44"
                    draggable={false}
                  />
                </div>

                {/* Info */}
                <div className="mt-auto flex flex-col gap-2">
                  <div>
                    <p className="font-bold text-stone-900 text-sm leading-tight">{p.nombre}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{p.presentacion}</p>
                  </div>
                  <p className="text-stone-500 text-xs leading-relaxed">{p.descripcion}</p>
                  <a
                    href={waLink(p.waTexto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-center text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Consultar disponibilidad
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-stone-800 text-sm">¿Necesitas recomendación?</p>
              <p className="text-stone-500 text-sm mt-0.5">Te asesoro durante tu sesión o por WhatsApp.</p>
            </div>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              Consultar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-4 bg-stone-100" aria-label="Galería de fotos">
        <div className="grid grid-cols-2 gap-1">
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/gato.jpg.jpeg"
              alt="Sesión de masaje a domicilio por Rocío Abarzúa"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <Image
              src="/images/564575294_18002891396827903_7842854950051613160_n.webp"
              alt="Camilla de masaje a domicilio en hogar — Rocío Masoterapia Santiago"
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

      {/* CONTACTO */}
      <section id="contacto" className="py-20 md:py-28 bg-white" aria-label="Contacto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="flex flex-col gap-7" itemScope itemType="https://schema.org/HealthAndBeautyBusiness">
              <div>
                <p className="text-stone-500 text-sm font-semibold tracking-widest uppercase mb-3">Contáctame</p>
                <h2 className="text-4xl font-bold text-stone-900" itemProp="name">
                  ¿Lista/o para tu masaje?
                </h2>
              </div>

              <p className="text-stone-600 text-lg leading-relaxed">
                Escríbeme por WhatsApp o agenda directamente en línea. Atiendo en Santiago de lunes a viernes y los sábados en la mañana.
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">📱</div>
                  <div>
                    <p className="font-bold text-stone-900">WhatsApp</p>
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
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">📸</div>
                  <div>
                    <p className="font-bold text-stone-900">Instagram</p>
                    <a
                      href="https://www.instagram.com/rocio.masoterapia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      @rocio.masoterapia
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">🕐</div>
                  <div>
                    <p className="font-bold text-stone-900">Horario de atención</p>
                    <p className="text-stone-600">Lun–Vie: <strong>09:00 – 20:00</strong></p>
                    <p className="text-stone-600">Sábado: <strong>10:00 – 13:00</strong></p>
                    <p className="text-stone-500 text-sm mt-1">
                      Cancelaciones y reagendamientos con 24 horas de anticipación.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-lg" aria-hidden="true">🗓️</div>
                  <div>
                    <p className="font-bold text-stone-900">WhatsApp</p>
                    <SetmoreButton className="text-left text-stone-600 hover:text-stone-900 transition-colors underline cursor-pointer bg-transparent p-0 text-sm">
                      Agendar por WhatsApp
                    </SetmoreButton>
                  </div>
                </div>
              </div>

              {/* Botones CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <SetmoreButton className="flex-1 text-center bg-stone-800 hover:bg-stone-700 text-white font-bold py-4 px-6 rounded-full transition-colors cursor-pointer">
                  Agendar hora
                </SetmoreButton>
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

            {/* Info tarjeta */}
            <div className="flex flex-col gap-6">
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-stone-900 mb-6">Tabla de precios</h3>
                <div className="flex flex-col gap-3">
                  {precios.map((p) => (
                    <div key={`${p.personas}-${p.duracion}`} className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">{p.personas}</p>
                        <p className="text-stone-500 text-xs">{p.duracion}</p>
                      </div>
                      <p className="font-black text-stone-900 text-lg">{p.precio}</p>
                    </div>
                  ))}
                </div>
                <p className="text-stone-400 text-xs mt-5 leading-relaxed">
                  Camilla, toallas, música y aromaterapia incluidos. Cancelaciones con 24 horas de anticipación.
                </p>
              </div>

              <div className="bg-stone-800 text-white rounded-2xl p-8 text-center">
                <p className="text-stone-300 text-sm mb-2">¿Preguntas? Escríbeme</p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-bold text-white hover:text-stone-200 transition-colors block mb-4"
                >
                  +56 9 4214 2229
                </a>
                <p className="text-stone-400 text-xs">Lun–Vie 09:00–20:00 · Sáb 10:00–13:00</p>
              </div>
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
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-white font-bold">Rocío Masoterapia</span>
              </div>
              <p className="text-sm text-stone-500 leading-relaxed">
                Masaje a domicilio en Santiago. Camilla, toallas, música y aromaterapia incluidos. Desde $42.000 los 60 min.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Servicios</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Relajante</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Descontracturante</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Masaje Deportivo</a></li>
                <li><a href="#precios" className="hover:text-white transition-colors">Ver precios</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li>📍 Santiago, Chile</li>
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    📱 +56 9 4214 2229
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/rocio.masoterapia" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    📸 @rocio.masoterapia
                  </a>
                </li>
                <li className="text-stone-600">Lun–Vie 09:00–20:00 · Sáb 10:00–13:00</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-600">
            <p>© {new Date().getFullYear()} Rocío Masoterapia. Todos los derechos reservados.</p>
            <p>Masaje a domicilio · Santiago · Chile</p>
          </div>
        </div>
      </footer>
    </>
  );
}
