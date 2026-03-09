"use client";

import Image from "next/image";

export function AboutSection() {
  return (
    <section id="nosotros" className="py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/616271293_17858492112595349_3059228116870493808_n.webp"
              alt="Instalaciones de Masoy Rehabilitación"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-stone-900 dark:text-stone-50">
              Sobre <span className="text-stone-500">Nostros</span>
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              En Masoy Rehabilitación nos dedicamos a entregar un servicio integral de kinesiología y masoterapia. 
              Nuestro objetivo es mejorar tu calidad de vida a través de tratamientos personalizados y adaptados a tus necesidades.
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              Trabajamos tanto con pacientes buscando recuperación de lesiones deportivas, dolores musculares por estrés o tratamientos post-operatorios, asegurando siempre una atención profesional, segura y efectiva.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
