/**
 * Layout primitives shared by every section. Section rhythm on the reference is
 * consistent: a 1px divider, then 32px of breathing room before the heading.
 */

import { ChevronRight } from "./icons";

/**
 * Centred content column. The reference measures 1120px of *content* at a
 * 1470px viewport, so the padding lives outside the max-width — adding it
 * inside would leave only 1040px and throw off the hero grid.
 */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] ${className}`}>
      {children}
    </div>
  );
}

/** Hairline that separates stacked sections. */
export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-line-soft ${className}`} />;
}

/**
 * A page section. `heading` is rendered as an h2; pass `headingClassName` only
 * when a section needs a different type scale than the 22px default.
 */
export function Section({
  heading,
  headingId,
  children,
  divider = true,
  className = "",
}: {
  heading?: string;
  headingId?: string;
  children: React.ReactNode;
  divider?: boolean;
  className?: string;
}) {
  return (
    <>
      {divider && <Divider />}
      <section
        aria-labelledby={headingId}
        className={`py-8 ${className}`}
      >
        {heading && (
          <h2
            id={headingId}
            className="mb-6 text-[22px] font-semibold leading-[26px] text-ink"
          >
            {heading}
          </h2>
        )}
        {children}
      </section>
    </>
  );
}

/**
 * Airbnb's black underlined "Show more" affordance — an inline text button with
 * a chevron. Used by the description, neighbourhood, and review sections.
 */
export function ShowMore({
  children = "Show more",
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-1 rounded text-base font-semibold text-ink underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
      {...rest}
    >
      {children}
      <ChevronRight size={12} className="mt-px" />
    </button>
  );
}

/**
 * Bordered pill/rect button — "Show all 50 amenities", "Show all 19 reviews".
 * Airbnb scales these down very slightly on press rather than on hover.
 */
export function OutlineButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-lg border border-ink bg-white px-6 py-[13px] text-base font-semibold text-ink transition-[background-color,transform] duration-200 hover:bg-hover active:scale-[0.98] ${className}`}
      style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Formats 28499 as "₹28,499" using the Indian digit grouping the page shows. */
export function formatINR(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
