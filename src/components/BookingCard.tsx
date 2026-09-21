"use client";

import Image from "next/image";
import { booking, listing } from "@/data/listing";
import { formatINR } from "./primitives";
import { ChevronDown, Flag } from "./icons";

/**
 * The sticky reservation panel. Sticks below the 89px header once the page
 * scrolls past the hero, matching the reference's behaviour.
 */
export function BookingCard() {
  return (
    <aside className="sticky top-[113px] w-[372px]" aria-label="Reserve this place">
      {/* Promo strip sits above the card, outside its border. */}
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-line bg-white p-4">
        <Image
          src="/assets/images/ui/discount.svg"
          alt=""
          width={28}
          height={28}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-ink">{booking.promo.title}</p>
          <button
            type="button"
            className="text-sm text-muted underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            {booking.promo.terms}
          </button>
        </div>
        <button
          type="button"
          className="rounded-lg border border-ink px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-hover"
        >
          Claim
        </button>
      </div>

      <div className="rounded-xl border border-line bg-white p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <p className="text-[22px] font-semibold leading-[26px] text-ink">
          <span className="underline underline-offset-2">
            {formatINR(booking.total)}
          </span>{" "}
          <span className="text-base font-normal text-ink">
            for {booking.nights} nights
          </span>
        </p>

        {/* Date + guest control grid — a single bordered box with inner rules. */}
        <div className="mt-6 overflow-hidden rounded-lg border border-line">
          <div className="grid grid-cols-2">
            <FieldButton label="CHECK-IN" value={booking.checkIn} />
            <FieldButton
              label="CHECKOUT"
              value={booking.checkOut}
              className="border-l border-line"
            />
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-between border-t border-line px-3 py-[10px] text-left transition-colors duration-200 hover:bg-hover"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-ink">
                Guests
              </span>
              <span className="block text-sm text-ink">{booking.guests}</span>
            </span>
            <ChevronDown size={12} className="text-ink" />
          </button>
        </div>

        {/* Cancellation sits in its own grey pill above the CTA. */}
        <p className="mt-4 rounded-lg bg-hover py-[10px] text-center text-sm text-muted">
          Free cancellation before{" "}
          <span className="font-semibold text-ink">17 October</span>
        </p>

        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-rausch py-[14px] text-base font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-rausch-dark active:scale-[0.99]"
          style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
        >
          Reserve
        </button>

        <p className="mt-3 text-center text-sm text-muted">
          You won&apos;t be charged yet
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-muted underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          <Flag size={14} className="no-underline" />
          Report this listing
        </button>
      </div>

      <span className="sr-only-focusable absolute">
        {listing.title} — {formatINR(booking.total)} for {booking.nights} nights
      </span>
    </aside>
  );
}

function FieldButton({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`px-3 py-[10px] text-left transition-colors duration-200 hover:bg-hover ${className}`}
    >
      <span className="block text-[10px] font-bold uppercase tracking-wide text-ink">
        {label}
      </span>
      <span className="block text-sm text-ink">{value}</span>
    </button>
  );
}
