"use client";

import { useCallback, useEffect, useState } from "react";

export type OverlayState = {
  /** Photo tour is open. */
  tour: boolean;
  /** Global photo index when the lightbox is open, else null. */
  item: number | null;
};

const TOUR = "PHOTO_TOUR_SCROLLABLE";
const CLOSED: OverlayState = { tour: false, item: null };

function parse(search: string): OverlayState {
  const q = new URLSearchParams(search);
  if (q.get("modal") !== TOUR) return CLOSED;
  const raw = q.get("modalItem");
  const n = raw === null ? null : Number(raw);
  return { tour: true, item: n !== null && Number.isInteger(n) ? n : null };
}

function serialise(state: OverlayState): string {
  if (!state.tour) return "/";
  const q = new URLSearchParams({ modal: TOUR });
  if (state.item != null) q.set("modalItem", String(state.item));
  return `/?${q.toString()}`;
}

/**
 * Overlay state mirrored into the URL, so the photo tour and lightbox are
 * deep-linkable and the back button closes them.
 *
 * Deliberately *not* built on `useSearchParams`: reading search params in a
 * client component forces its Suspense boundary to bail out to client-only
 * rendering, and on this page that boundary never hydrated — leaving the whole
 * listing visible but inert. The History API has no such coupling.
 *
 * State starts closed so the server and first client render agree; a deep link
 * is applied in an effect immediately after mount.
 */
export function useOverlayRoute() {
  const [state, setState] = useState<OverlayState>(CLOSED);

  // Adopt a deep-linked overlay, and follow back/forward.
  useEffect(() => {
    const sync = () => setState(parse(window.location.search));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const go = useCallback((next: OverlayState) => {
    setState(next);
    const url = serialise(next);
    if (url !== window.location.pathname + window.location.search) {
      window.history.pushState(null, "", url);
    }
  }, []);

  return {
    state,
    openTour: useCallback(() => go({ tour: true, item: null }), [go]),
    openPhoto: useCallback((item: number) => go({ tour: true, item }), [go]),
    backToTour: useCallback(() => go({ tour: true, item: null }), [go]),
    closeAll: useCallback(() => go(CLOSED), [go]),
  };
}
