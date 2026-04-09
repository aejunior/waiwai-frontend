import { useState, useEffect, useRef } from "react";

/**
 * Hook customizado para detectar a direção do scroll.
 * Retorna `true` se o scroll for para CIMA, e `false` se for para BAIXO.
 *
 * @param threshold - Distância em pixels para começar a esconder o header.
 */
export function useScrollDirection(threshold: number = 100) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sempre mostra o header se estivermos perto do topo
      if (currentScrollY <= threshold) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Detecta a direção
      if (currentScrollY > lastScrollY.current) {
        // Scroll para BAIXO
        setIsVisible(false);
      } else {
        // Scroll para CIMA
        setIsVisible(true);
      }

      // Atualiza a última posição do scroll
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Limpeza do evento
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
}
