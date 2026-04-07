"use client";

import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full p-12 rounded-[40px] bg-card border border-border box-border origin-top ${itemClassName}`.trim()}
    style={{
      height: '400px',
      marginBottom: '32px',
      backfaceVisibility: 'hidden',
      willChange: 'transform',
      transformOrigin: 'top center',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** Distance between card start positions (px). Default: 120 */
  itemDistance?: number;
  /** How much each card scales down when stacked (fraction). Default: 0.04 */
  itemScale?: number;
  /** Vertical offset between stacked cards (px). Default: 28 */
  itemStackDistance?: number;
  /** How far from top of viewport cards pin (vh). Default: 15 */
  stackPosition?: number;
  /** Overall minimum scale of a card when fully buried. Default: 0.82 */
  baseScale?: number;
  onStackComplete?: () => void;
}

export const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 120,
  itemScale = 0.04,
  itemStackDistance = 28,
  stackPosition = 15,
  baseScale = 0.82,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>('.scroll-stack-card'));
    if (!cards.length) return;

    // Set initial card styles
    cards.forEach((card) => {
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform';
    });

    const stackPositionPx = (stackPosition / 100) * window.innerHeight;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const endEl = container.querySelector<HTMLElement>('.scroll-stack-end');
      const endTop = endEl ? endEl.getBoundingClientRect().top + scrollY : Infinity;
      const pinEnd = endTop - vh * 0.5;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + scrollY;

        // Trigger start: card approaches the pinning position
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
        // Trigger end: a bit earlier for the scale collapse
        const triggerEnd = triggerStart + cardTop * 0.05;
        const pinStart = triggerStart;

        // Scale progress: 0 → 1 as card collapses into the stack
        const scaleProgress = Math.max(0, Math.min(1, (scrollY - triggerStart) / (Math.max(1, triggerEnd - triggerStart))));
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);

        // Pin: translated to stick at the stack position
        let translateY = 0;
        if (scrollY >= pinStart && scrollY <= pinEnd) {
          translateY = scrollY - cardTop + stackPositionPx + itemStackDistance * i;
        } else if (scrollY > pinEnd) {
          translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        }

        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        card.style.zIndex = String(10 + i);
      });

      // Fire onStackComplete when the last card is pinned
      const lastCard = cards[cards.length - 1];
      if (lastCard) {
        const lastCardTop = lastCard.getBoundingClientRect().top + scrollY;
        const lastPinStart = lastCardTop - stackPositionPx - itemStackDistance * (cards.length - 1);
        const endEl2 = container.querySelector<HTMLElement>('.scroll-stack-end');
        const endTop2 = endEl2 ? endEl2.getBoundingClientRect().top + scrollY : Infinity;
        const lastPinEnd = endTop2 - vh * 0.5;
        const isStacked = scrollY >= lastPinStart && scrollY <= lastPinEnd;

        if (isStacked && !completedRef.current) {
          completedRef.current = true;
          onStackComplete?.();
        } else if (!isStacked && completedRef.current) {
          completedRef.current = false;
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount to set initial positions
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, baseScale, onStackComplete]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner px-6 md:px-20 pb-[40vh]">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
