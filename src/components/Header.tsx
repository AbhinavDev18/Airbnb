/**
 * Sticky page header: logo, compact search pill, account controls.
 *
 * Nothing here is interactive yet — the reference's menus are out of scope — so
 * this stays a server component. Total height is 89px: 88px of content plus the
 * 1px hairline that the page scrolls under.
 */

import Link from "next/link";

import { Container } from "./primitives";
import { Globe, Menu, Search } from "./icons";

/**
 * Airbnb's "Bélo" mark, redrawn on the 32x32 icon grid: two mirrored strokes
 * that meet at the apex and curl into loops at the base.
 */
function Belo() {
  return (
    <svg
      viewBox="0 0 32 32"
      width={32}
      height={32}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 3.2C12 9.5 5.3 17.4 5.3 22.6A3.9 3.9 0 0 0 13.1 22.6C13.1 18.5 14 11 16 3.2Z" />
      <path d="M16 3.2C20 9.5 26.7 17.4 26.7 22.6A3.9 3.9 0 0 1 18.9 22.6C18.9 18.5 18 11 16 3.2Z" />
    </svg>
  );
}

/** A word in the search pill — "Anywhere", "Anytime", "Add guests". */
function PillButton({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-hover ${
        muted ? "font-normal text-muted" : "font-semibold text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/** 1px vertical hairline between the pill's segments. */
function PillDivider() {
  return <span aria-hidden="true" className="h-6 w-px shrink-0 bg-line" />;
}

export function Header() {
  return (
    // Not sticky: the reference lets the header scroll away and hands the top
    // of the viewport to StickyNav once you pass the hero.
    <header className="relative z-40 w-full border-b border-line-soft bg-surface">
      <Container className="flex h-[88px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Airbnb homepage"
          className="flex shrink-0 items-center gap-0.5 text-rausch"
        >
          <Belo />
          <span className="text-2xl font-bold leading-none tracking-[-0.4px]">
            airbnb
          </span>
        </Link>

        <div className="flex h-12 items-center gap-1 rounded-pill border border-line bg-surface pl-2.5 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed 30px UI sprite, not content */}
          <img
            src="/assets/images/ui/searchbar-house.png"
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] shrink-0"
          />
          <PillButton>Anywhere</PillButton>
          <PillDivider />
          <PillButton>Anytime</PillButton>
          <PillDivider />
          <PillButton muted>Add guests</PillButton>
          <button
            type="button"
            aria-label="Search"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rausch text-white transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-rausch-dark"
          >
            <Search size={14} />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            className="rounded-full px-4 py-3 text-sm font-semibold text-ink transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-hover"
          >
            Become a host
          </button>
          <button
            type="button"
            aria-label="Choose a language"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-hover"
          >
            <Globe size={18} />
          </button>
          <button
            type="button"
            aria-label="Main navigation menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-hover"
          >
            <Menu size={16} />
          </button>
        </div>
      </Container>
    </header>
  );
}
