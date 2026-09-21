"use client";

/**
 * Listing title row plus the five-photo hero mosaic.
 *
 * The mosaic geometry is fixed rather than fluid: the reference lays it out on a
 * 560/272/272 column grid with 8px gutters, which sums exactly to the 1120px
 * content column. Every tile opens the photo tour at its own index.
 */

import Image from "next/image";

import { Grid, Heart, Share } from "./icons";
import { heroPhotos, listing, photos } from "@/data/listing";

/** Underlined "Share" / "Save" action above the mosaic. */
function TitleAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-2 rounded-lg p-2 text-sm font-semibold text-ink underline underline-offset-2 transition-colors duration-200 ease-[var(--ease-airbnb)] hover:bg-hover"
    >
      {icon}
      {label}
    </button>
  );
}

export function Hero({
  onOpenTour,
}: {
  onOpenTour: (photoIndex?: number) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[1120px]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h1 className="text-[26px] font-semibold leading-[30px] text-ink">
          {listing.title}
        </h1>
        <div className="flex shrink-0 items-center">
          <TitleAction icon={<Share size={16} />} label="Share" />
          <TitleAction
            icon={<Heart size={16} className="fill-none" />}
            label="Save"
          />
        </div>
      </div>

      <div className="relative h-[494px] w-full overflow-hidden rounded-hero">
        <div className="grid h-full grid-cols-[560px_272px_272px] grid-rows-[243px_243px] gap-2">
          {heroPhotos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => onOpenTour(i)}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
              className={`group relative overflow-hidden ${
                i === 0 ? "row-span-2" : ""
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? "560px" : "272px"}
                preload={i === 0}
                className="object-cover transition-transform duration-300 ease-[var(--ease-airbnb)] group-hover:scale-[1.045]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[rgba(0,0,0,0.12)] opacity-0 transition-opacity duration-200 ease-[var(--ease-airbnb)] group-hover:opacity-100"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenTour()}
          className="absolute bottom-6 right-6 flex items-center gap-2 rounded-lg border border-ink bg-surface px-[15px] py-[7px] text-sm font-semibold text-ink transition-[background-color,transform] duration-200 ease-[var(--ease-airbnb)] hover:scale-[1.04] hover:bg-hover"
        >
          <Grid size={14} />
          Show all photos
        </button>
      </div>
    </div>
  );
}
