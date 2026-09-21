"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/** Elements whose own key handling must win over the dialog's shortcuts. */
const TEXT_ENTRY = /^(INPUT|TEXTAREA|SELECT)$/;

/**
 * Modal dialog plumbing: scroll lock, background inert, focus trap, Escape,
 * focus restoration.
 *
 * Returns a ref to attach to the dialog element. The behaviours have to live
 * together because they share the same lifecycle — separating them led to focus
 * being restored before the trap released.
 */
export function useDialog<T extends HTMLElement>({
  open,
  onClose,
  onKeyDown,
  initialFocus,
}: {
  open: boolean;
  onClose: () => void;
  /** Extra key handling (the lightbox uses this for arrow paging). */
  onKeyDown?: (e: KeyboardEvent) => void;
  /**
   * Element to focus on open instead of the dialog container — used when the
   * dialog re-opens behind a closing child dialog and owes focus to a specific
   * control (the photo tour returning from the lightbox).
   */
  initialFocus?: (root: T) => HTMLElement | null | undefined;
}) {
  const ref = useRef<T>(null);
  // Whatever had focus before we opened — we owe it focus back on close.
  const restoreTo = useRef<HTMLElement | null>(null);
  // Keep the latest handlers without re-running the whole effect each render.
  // Assigned in an effect rather than during render: writing a ref while
  // rendering is unsafe under concurrent rendering, and React's lint rejects it.
  const keyHandler = useRef(onKeyDown);
  const pickFocus = useRef(initialFocus);
  // `onClose` is also held in a ref, deliberately. Callers build it from the
  // current URL, so it changes identity on every navigation — including the
  // lightbox's own arrow paging. If the effect depended on it, each keypress
  // would tear the dialog down and re-run focus/scroll-lock setup, and closing
  // would restore focus to a node captured mid-session.
  const close = useRef(onClose);
  useEffect(() => {
    keyHandler.current = onKeyDown;
    pickFocus.current = initialFocus;
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    restoreTo.current = document.activeElement as HTMLElement | null;

    // Compensate for the vanishing scrollbar so the page doesn't jump.
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    // Take the rest of the page out of the accessibility tree and out of reach
    // of pointer and virtual cursors — the Tab trap below only covers Tab.
    const inerted = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        !el.inert &&
        !el.contains(ref.current) &&
        // Leave Next's dev error overlay usable.
        !el.tagName.startsWith("NEXTJS-"),
    );
    for (const el of inerted) el.inert = true;

    // Move focus to the dialog container rather than its first button. Focusing
    // a button programmatically makes browsers paint a :focus-visible ring even
    // when the dialog was opened by mouse; the container is tabIndex={-1} so it
    // takes focus silently. Tab from here still lands on the first control.
    // Focus is applied after the dialog's enter transition has started and the
    // sibling dialog's teardown has finished. Doing it on the next frame is too
    // early: a closing dialog restores focus during the same commit, and the
    // browser drops a focus() aimed at an element inside a scroller that has
    // not been laid out yet. Re-assert once if something clawed focus back.
    const focusIn = window.setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const target = pickFocus.current?.(node) ?? node;
      target.focus({ preventScroll: target === node });
      if (!node.contains(document.activeElement)) {
        target.focus({ preventScroll: target === node });
      }
    }, 80);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close.current();
        return;
      }

      if (e.key === "Tab") {
        const node = ref.current;
        if (!node) return;
        const items = Array.from(
          node.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (items.length === 0) {
          e.preventDefault();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;

        // Wrap at both ends, and pull focus back in if it escaped the dialog.
        if (e.shiftKey && (active === first || !node.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !node.contains(active))) {
          e.preventDefault();
          first.focus();
        }
        return;
      }

      // Never swallow a browser/OS shortcut (Cmd+← is Back) or a keystroke
      // aimed at a text field — dialog shortcuts are for bare keys only.
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable || TEXT_ENTRY.test(target?.tagName ?? "")) {
        return;
      }

      keyHandler.current?.(e);
    }

    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusIn);
      document.removeEventListener("keydown", onKey);
      for (const el of inerted) el.inert = false;
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      // Skip a target that has since been unmounted, and never "restore" to
      // <body> — body.focus() is a no-op that just drops focus on the floor.
      const back = restoreTo.current;
      if (back && back.isConnected && back !== document.body) {
        back.focus({ preventScroll: true });
      }
    };
  }, [open]);

  return ref;
}
