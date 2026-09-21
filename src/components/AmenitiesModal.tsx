"use client";

/**
 * Full amenities dialog. Focus moves into the panel on open, Tab is trapped
 * inside it, Escape and the scrim close it, and focus returns to whatever was
 * focused before it opened.
 */

import { useEffect, useRef, useState } from "react";
import { amenityGroups } from "@/data/listing";
import { Close } from "./icons";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

const TITLE_ID = "amenities-modal-title";

export function AmenitiesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.classList.add("scroll-locked");
    panelRef.current?.focus();
    const frame = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(frame);
      setShown(false);
      document.body.classList.remove("scroll-locked");
      previous?.focus();
    };
  }, [open]);

  if (!open) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key !== "Tab" || !panelRef.current) return;

    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    if (nodes.length === 0) return;

    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;

    if (e.shiftKey && (active === first || active === panelRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        transitionTimingFunction: "var(--ease-airbnb)",
      }}
      className={`fixed inset-0 z-[70] flex items-center justify-center p-6 transition-opacity duration-200 ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
        className={`max-h-[90vh] w-[780px] max-w-full overflow-y-auto rounded-xl bg-surface shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-[250ms] ${
          shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="sticky top-0 z-10 flex h-16 items-center bg-surface px-6">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover"
            style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
          >
            <Close size={16} />
          </button>
        </div>

        <div className="px-12 pb-12 pt-6">
          <h2
            id={TITLE_ID}
            className="text-[26px] font-semibold leading-[30px] text-ink"
          >
            What this place offers
          </h2>

          {amenityGroups.map((g) => (
            <div key={g.group}>
              <h3 className="mt-8 text-lg font-semibold text-ink">{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line-soft py-4 text-base text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
