"use client";

import { useEffect, useRef, useState } from "react";
import { useOverlayRoute } from "@/hooks/useOverlayRoute";
import { Amenities } from "./Amenities";
import { AmenitiesModal } from "./AmenitiesModal";
import { BookingCard } from "./BookingCard";
import { Hero } from "./Hero";
import { HostSection } from "./HostSection";
import { Lightbox } from "./Lightbox";
import { Neighbourhood } from "./Neighbourhood";
import { NearbyStays } from "./NearbyStays";
import { Overview } from "./Overview";
import { PhotoTour } from "./PhotoTour";
import { Reviews } from "./Reviews";
import { Sleeping } from "./Sleeping";
import { StayCalendar } from "./StayCalendar";
import { StickyNav } from "./StickyNav";
import { ThingsToKnow } from "./ThingsToKnow";
import { Container, Divider } from "./primitives";

/**
 * Overlay state is mirrored into the URL, matching the reference:
 *   ?modal=PHOTO_TOUR_SCROLLABLE             → photo tour
 *   ?modal=PHOTO_TOUR_SCROLLABLE&modalItem=N → lightbox on photo N
 *
 * See `useOverlayRoute` for why this uses the History API rather than
 * `useSearchParams`.
 */
export function ListingPage() {
  const { state, openTour, openPhoto, backToTour, closeAll } =
    useOverlayRoute();
  const { tour: tourOpen, item: lightboxIndex } = state;

  // The amenities modal isn't deep-linked on the reference, so it stays local.
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);

  // The tour unmounts while the lightbox is up, so the photo button that opened
  // it is gone by the time focus would be restored. Remember which photo was
  // showing and hand it to the tour so it can focus the equivalent button.
  const lastViewedPhoto = useRef<number | null>(null);
  useEffect(() => {
    if (lightboxIndex !== null) lastViewedPhoto.current = lightboxIndex;
  }, [lightboxIndex]);

  return (
    <>
      <StickyNav />
      {/* pt-8 reproduces the reference's 32px gap between header and title. */}
      <main id="main" className="px-10 pb-20 pt-8">
        <Container>
          <div id="photos" className="scroll-mt-[88px]">
            <Hero
              onOpenTour={(i?: number) =>
                i == null ? openTour() : openPhoto(i)
              }
            />
          </div>

          {/* Two-column body: 652px main column, sticky booking rail. */}
          <div className="flex gap-[104px] pt-8">
            <div className="w-[652px] shrink-0">
              <Overview />
              <Sleeping />
              <div id="amenities" className="scroll-mt-[88px]">
                <Amenities onShowAll={() => setAmenitiesOpen(true)} />
              </div>
              <StayCalendar />
            </div>
            <div className="flex-1 pt-8">
              <BookingCard />
            </div>
          </div>

          <div id="reviews" className="scroll-mt-[88px]">
            <Reviews />
          </div>
          <div id="location" className="scroll-mt-[88px]">
            <Neighbourhood />
          </div>
          <HostSection />
          <ThingsToKnow />
          <NearbyStays />
          <Divider />
        </Container>
      </main>

      <PhotoTour
        open={tourOpen && lightboxIndex === null}
        onClose={closeAll}
        onOpenPhoto={openPhoto}
        getFocusPhoto={() => lastViewedPhoto.current}
      />

      <Lightbox
        index={tourOpen ? lightboxIndex : null}
        onIndexChange={openPhoto}
        onClose={closeAll}
        onBackToTour={backToTour}
      />

      <AmenitiesModal
        open={amenitiesOpen}
        onClose={() => setAmenitiesOpen(false)}
      />
    </>
  );
}
