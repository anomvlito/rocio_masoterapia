'use client'

import { useRef, useState } from 'react'

type Slot = 'hero' | 'profile' | 'gallery1' | 'gallery2'

interface SlotConfig {
  slot: Slot
  label: string
  src: string
}

const SLOTS: SlotConfig[] = [
  { slot: 'hero', label: 'Foto Hero (portada)', src: '/images/hero.jpg' },
  { slot: 'profile', label: 'Foto Perfil', src: '/images/profile.webp' },
  { slot: 'gallery1', label: 'Galería 1', src: '/images/gallery1.webp' },
  { slot: 'gallery2', label: 'Galería 2', src: '/images/gallery2.webp' },
]

export default function AdminPanel() {
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [messages, setMessages] = useState<Record<string, string>>({})
  const [timestamps, setTimestamps] = useState<Record<string, number>>({})

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  async function handleFileChange(slot: Slot, file: File) {
    setUploading((prev) => ({ ...prev, [slot]: true }))
    setMessages((prev) => ({ ...prev, [slot]: '' }))

    const formData = new FormData()
    formData.append('file', file)
    formData.append('slot', slot)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (data.ok) {
        setMessages((prev) => ({ ...prev, [slot]: 'Foto actualizada correctamente.' }))
        setTimestamps((prev) => ({ ...prev, [slot]: Date.now() }))
      } else {
        setMessages((prev) => ({
          ...prev,
          [slot]: data.error ?? 'Error al subir la foto.',
        }))
      }
    } catch {
      setMessages((prev) => ({
        ...prev,
        [slot]: 'Error de conexión. Intenta de nuevo.',
      }))
    } finally {
      setUploading((prev) => ({ ...prev, [slot]: false }))
      // Reset input so the same file can be re-selected if needed
      if (fileInputRefs.current[slot]) {
        fileInputRefs.current[slot]!.value = ''
      }
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-stone-800">
          Panel Admin — Rocío Masoterapia
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm text-stone-500 hover:text-stone-700 transition-colors"
          >
            ← Ver sitio
          </a>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-sm text-stone-500 mb-6">
          Selecciona una imagen para reemplazarla en el sitio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SLOTS.map(({ slot, label, src }) => {
            const ts = timestamps[slot]
            const imgSrc = ts ? `${src}?t=${ts}` : src
            const isUploading = uploading[slot] ?? false
            const message = messages[slot] ?? ''
            const isSuccess = message.includes('correctamente')

            return (
              <div
                key={slot}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm"
              >
                {/* Image preview */}
                <div className="aspect-video bg-stone-100 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card footer */}
                <div className="p-4">
                  <p className="text-sm font-medium text-stone-700 mb-3">
                    {label}
                  </p>

                  {/* Hidden file input */}
                  <input
                    ref={(el) => { fileInputRefs.current[slot] = el }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileChange(slot, file)
                    }}
                  />

                  <button
                    onClick={() => fileInputRefs.current[slot]?.click()}
                    disabled={isUploading}
                    className="w-full py-2 px-4 bg-stone-800 text-white text-sm rounded-lg font-medium hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUploading ? 'Subiendo...' : 'Cambiar foto'}
                  </button>

                  {message && (
                    <p
                      className={`mt-2 text-xs ${
                        isSuccess ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {message}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
