"use client";

import Script from "next/script";
import { cn } from "@/lib/utils";

const SETMORE_URL = "https://masoyrehabilitacion.setmore.com";

// Trigger oculto — cargado UNA vez en el layout o en el primer SetmoreButton
export function SetmoreTrigger() {
  return (
    <>
      <Script
        id="setmore-widget-script"
        src="https://storage.googleapis.com/fullintegration-live/webComponentAppListing/Container/setmoreIframe.js"
        strategy="lazyOnload"
      />
      {/* Botón oculto que el script de Setmore intercepta */}
      <a
        id="Setmore_button_iframe"
        href={SETMORE_URL}
        style={{ display: "none" }}
        aria-hidden="true"
        tabIndex={-1}
      >
        Setmore trigger
      </a>
    </>
  );
}

interface SetmoreButtonProps {
  className?: string;
  children?: React.ReactNode;
}

// Botón reutilizable — puede usarse N veces en cualquier parte
export function SetmoreButton({ className, children }: SetmoreButtonProps) {
  const openWidget = () => {
    const trigger = document.getElementById("Setmore_button_iframe");
    if (trigger) {
      trigger.click();
    } else {
      // Fallback: abrir en nueva pestaña si el script aún no cargó
      window.open(SETMORE_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button type="button" onClick={openWidget} className={cn(className)}>
      {children ?? "Agendar hora"}
    </button>
  );
}
