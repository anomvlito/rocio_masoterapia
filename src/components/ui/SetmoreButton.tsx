"use client";

import { cn } from "@/lib/utils";

const WA_NUMBER = "56942142229";
const WA_TEXT = encodeURIComponent("Hola Rocío, quisiera agendar un masaje a domicilio 💆");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

interface BookingButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SetmoreButton({ className, children }: BookingButtonProps) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(className)}
    >
      {children ?? "Agendar hora"}
    </a>
  );
}

// Ya no se necesita el trigger de Setmore
export function SetmoreTrigger() {
  return null;
}
