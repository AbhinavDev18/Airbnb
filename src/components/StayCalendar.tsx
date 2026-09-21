"use client";

import { booking } from "@/data/listing";
import { ChevronLeft, ChevronRight } from "./icons";

/** The two months shown side by side; October 2026 is the first selectable one. */
const MONTHS = [
  { year: 2026, month: 9 },
  { year: 2026, month: 10 },
] as const;

/** Selected stay — endpoints are circled, the nights between read as a band. */
const RANGE = { year: 2026, month: 9, start: 18, end: 23 };

/** Blocked dates in November 2026. */
const UNAVAILABLE = { year: 2026, month: 10, days: [18, 19, 20, 21, 22, 23, 24] };

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const WEEKDAYS = [
  { initial: "S", name: "Sunday" },
  { initial: "M", name: "Monday" },
  { initial: "T", name: "Tuesday" },
  { initial: "W", name: "Wednesday" },
  { initial: "T", name: "Thursday" },
  { initial: "F", name: "Friday" },
  { initial: "S", name: "Saturday" },
];

/**
 * Splits a month into calendar weeks. Leading blanks pad to the weekday the 1st
 * falls on; trailing blanks keep every row seven cells wide for the grid roles.
 */
function weeksOf(year: number, month: number): (number | null)[][] {
  const lead = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, i) =>
    cells.slice(i * 7, i * 7 + 7),
  );
}

/** The date-range picker between the amenities and reviews sections. */
export function StayCalendar() {
  return (
    <section aria-label="Choose dates" className="py-8">
      <h2 className="text-[22px] font-semibold leading-[26px] text-ink">
        {booking.headline}
      </h2>
      <p className="mt-1 text-sm text-muted">{booking.dateRange}</p>

      <div className="relative mt-8 grid grid-cols-2 gap-12">
        <GhostButton
          label="Previous month"
          disabled
          className="absolute left-0 top-0"
        >
          <ChevronLeft size={12} />
        </GhostButton>
        <GhostButton label="Next month" className="absolute right-0 top-0">
          <ChevronRight size={12} />
        </GhostButton>

        {MONTHS.map(({ year, month }) => (
          <Month key={`${year}-${month}`} year={year} month={month} />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="text-sm font-semibold text-ink underline underline-offset-2 transition-opacity duration-200 hover:opacity-70"
          style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
        >
          Clear dates
        </button>
      </div>
    </section>
  );
}

function Month({ year, month }: { year: number; month: number }) {
  const caption = `${MONTH_NAMES[month]} ${year}`;

  return (
    <div>
      <div className="flex h-8 items-center justify-center text-base font-semibold text-ink">
        {caption}
      </div>

      <div role="grid" aria-label={caption} className="mt-2">
        <div role="row" className="grid grid-cols-7">
          {WEEKDAYS.map((day, i) => (
            <div
              key={i}
              role="columnheader"
              aria-label={day.name}
              className="py-2 text-center text-xs font-semibold text-muted"
            >
              {day.initial}
            </div>
          ))}
        </div>

        {weeksOf(year, month).map((week, wi) => (
          <div role="row" key={wi} className="grid grid-cols-7">
            {week.map((day, di) =>
              day === null ? (
                <div key={di} role="gridcell" />
              ) : (
                <Day key={di} year={year} month={month} day={day} />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Day({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) {
  const inRangeMonth = year === RANGE.year && month === RANGE.month;
  const isEndpoint =
    inRangeMonth && (day === RANGE.start || day === RANGE.end);
  const isInRange = inRangeMonth && day > RANGE.start && day < RANGE.end;
  const isUnavailable =
    year === UNAVAILABLE.year &&
    month === UNAVAILABLE.month &&
    UNAVAILABLE.days.includes(day);

  const state = isEndpoint
    ? "bg-ink text-white rounded-full"
    : isInRange
      ? "bg-hover text-ink"
      : isUnavailable
        ? "text-muted opacity-40 line-through"
        : "text-ink hover:rounded-full hover:bg-hover";

  return (
    <button
      type="button"
      role="gridcell"
      aria-label={`${day} ${MONTH_NAMES[month]} ${year}`}
      aria-selected={isEndpoint ? true : undefined}
      aria-disabled={isUnavailable ? true : undefined}
      disabled={isUnavailable}
      className={`aspect-square w-full text-sm transition-colors duration-200 ${state}`}
      style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
    >
      {day}
    </button>
  );
}

/** 32px circular chevron control flanking the month captions. */
function GhostButton({
  label,
  disabled = false,
  className = "",
  children,
}: {
  label: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={`flex size-8 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-hover disabled:pointer-events-none disabled:opacity-30 ${className}`}
      style={{ transitionTimingFunction: "var(--ease-airbnb)" }}
    >
      {children}
    </button>
  );
}
