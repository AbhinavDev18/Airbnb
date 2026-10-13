"use client";

import { useEffect } from "react";

export function ListingInteractions() {
  useEffect(() => {
    const tourEl = document.getElementById("_KpcKWX");
    const lightboxEl = document.getElementById("lightbox");
    const tourScroll = document.getElementById("tourScroll");
    const heroGrid = document.getElementById("heroGrid");
    const showAllPhotosBtn = document.getElementById("showAllPhotos");
    const tourBackBtn = document.getElementById("tourBack");
    const tourNav = document.getElementById("tourNav");
    const lbStage = document.getElementById("lbStage");
    const lbTitle = document.getElementById("lbTitle");
    const lbCounter = document.getElementById("lbCounter");
    const lbPrev = document.getElementById("lbPrev") as HTMLButtonElement | null;
    const lbNext = document.getElementById("lbNext") as HTMLButtonElement | null;
    const lbClose = document.getElementById("lbClose");
    const lbGrid = document.getElementById("lbGrid");
    const showAmenBtn = document.getElementById("showAmen");
    const amenModal = document.getElementById("amenModal");
    const amenClose = document.getElementById("amenClose");
    const stickyNav = document.getElementById("_JXzroy");
    const descMoreBtn = document.getElementById("descMore");
    const descText = document.getElementById("descText");
    const simPrev = document.getElementById("simPrev") as HTMLButtonElement | null;
    const simNext = document.getElementById("simNext") as HTMLButtonElement | null;
    const simTrack = document.getElementById("simTrack");

    if (!tourEl || !lightboxEl) return;

    // Collect all tour photos
    const tourPhotoButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>("#tourRooms button._GXrMIo"),
    );

    let currentLbIndex = 0;

    const openTour = (targetRoomId?: string) => {
      tourEl.classList.add("_PjnNJs");
      tourEl.setAttribute("aria-hidden", "false");
      document.body.classList.add("_pINcte");

      const currentSearch = new URLSearchParams(window.location.search);
      if (currentSearch.get("modal") !== "PHOTO_TOUR_SCROLLABLE") {
        window.history.pushState(
          { modal: "PHOTO_TOUR_SCROLLABLE" },
          "",
          "?modal=PHOTO_TOUR_SCROLLABLE",
        );
      }

      if (targetRoomId && tourScroll) {
        requestAnimationFrame(() => {
          const roomEl = document.getElementById(targetRoomId);
          if (roomEl) {
            roomEl.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            tourScroll.scrollTop = 0;
          }
        });
      } else if (tourScroll) {
        tourScroll.scrollTop = 0;
      }
    };

    const closeTour = (updateHistory = true) => {
      closeLightbox(false);
      tourEl.classList.remove("_PjnNJs");
      tourEl.setAttribute("aria-hidden", "true");
      document.body.classList.remove("_pINcte");

      if (updateHistory) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    const renderLightboxPhoto = (index: number) => {
      if (!lbStage || tourPhotoButtons.length === 0) return;
      if (index < 0) index = 0;
      if (index >= tourPhotoButtons.length) index = tourPhotoButtons.length - 1;

      currentLbIndex = index;
      const targetBtn = tourPhotoButtons[index];
      const img = targetBtn?.querySelector("img");
      const src = img?.getAttribute("src") || "";
      const alt = img?.getAttribute("alt") || "";
      const section = targetBtn?.closest("section");
      const roomTitle =
        section?.querySelector("._AnkvRF")?.textContent || "Photo gallery";

      lbStage.innerHTML = `<img class="_SSnzPz" src="${src}" alt="${alt}" style="max-width:min(1100px, 100%);max-height:100%;width:auto;height:auto;object-fit:contain;animation:lbFade .3s ease;" />`;

      if (lbTitle) lbTitle.textContent = roomTitle;
      if (lbCounter)
        lbCounter.textContent = `${index + 1} / ${tourPhotoButtons.length}`;

      if (lbPrev) lbPrev.disabled = index === 0;
      if (lbNext) lbNext.disabled = index === tourPhotoButtons.length - 1;
    };

    const openLightbox = (index: number, updateHistory = true) => {
      openTour();
      lightboxEl.classList.add("_PjnNJs");
      lightboxEl.setAttribute("aria-hidden", "false");
      renderLightboxPhoto(index);

      if (updateHistory) {
        window.history.pushState(
          { modal: "PHOTO_TOUR_SCROLLABLE", modalItem: index },
          "",
          `?modal=PHOTO_TOUR_SCROLLABLE&modalItem=${index}`,
        );
      }
    };

    const closeLightbox = (updateHistory = true) => {
      lightboxEl.classList.remove("_PjnNJs");
      lightboxEl.setAttribute("aria-hidden", "true");

      if (updateHistory) {
        window.history.pushState(
          { modal: "PHOTO_TOUR_SCROLLABLE" },
          "",
          "?modal=PHOTO_TOUR_SCROLLABLE",
        );
      }
    };

    // Hero Mosaic buttons: map clicks to photo tour
    // Image 1: Living room 2 (tour-room-1)
    // Image 2: Living room 2 (tour-room-1)
    // Image 3: Living room 2 (tour-room-1)
    // Image 4: Bedroom (tour-room-3)
    // Image 5: Exterior (tour-room-6)
    const heroRoomMap = [
      "tour-room-1",
      "tour-room-1",
      "tour-room-1",
      "tour-room-3",
      "tour-room-6",
    ];

    if (heroGrid) {
      const heroButtons = Array.from(
        heroGrid.querySelectorAll<HTMLButtonElement>("button._toiEJx"),
      );
      heroButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          openTour(heroRoomMap[idx] || "tour-room-0");
        });
      });
    }

    if (showAllPhotosBtn) {
      showAllPhotosBtn.addEventListener("click", () => {
        openTour("tour-room-0");
      });
    }

    if (tourBackBtn) {
      tourBackBtn.addEventListener("click", () => {
        closeTour();
      });
    }

    // Category navigation tabs in photo tour
    if (tourNav) {
      const navButtons = Array.from(
        tourNav.querySelectorAll<HTMLButtonElement>("button._gKVFNL"),
      );
      navButtons.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          const target = document.getElementById(`tour-room-${idx}`);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    }

    // Tour photo buttons: click opens lightbox
    tourPhotoButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        openLightbox(idx);
      });
    });

    // Lightbox controls
    if (lbPrev) {
      lbPrev.addEventListener("click", () => {
        if (currentLbIndex > 0) {
          openLightbox(currentLbIndex - 1);
        }
      });
    }

    if (lbNext) {
      lbNext.addEventListener("click", () => {
        if (currentLbIndex < tourPhotoButtons.length - 1) {
          openLightbox(currentLbIndex + 1);
        }
      });
    }

    if (lbClose) {
      lbClose.addEventListener("click", () => {
        closeLightbox();
      });
    }

    if (lbGrid) {
      lbGrid.addEventListener("click", () => {
        closeLightbox();
      });
    }

    // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isLbOpen = lightboxEl.classList.contains("_PjnNJs");
      const isTourOpen = tourEl.classList.contains("_PjnNJs");

      if (isLbOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeLightbox();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (currentLbIndex > 0) openLightbox(currentLbIndex - 1);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (currentLbIndex < tourPhotoButtons.length - 1)
            openLightbox(currentLbIndex + 1);
        }
      } else if (isTourOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeTour();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // History & Popstate synchronization
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const modal = params.get("modal");
      const modalItem = params.get("modalItem");

      if (modal === "PHOTO_TOUR_SCROLLABLE") {
        if (modalItem !== null && !isNaN(parseInt(modalItem, 10))) {
          openLightbox(parseInt(modalItem, 10), false);
        } else {
          openTour();
          closeLightbox(false);
        }
      } else {
        closeTour(false);
      }
    };

    window.addEventListener("popstate", syncFromUrl);
    syncFromUrl();

    // "Where you'll sleep" cards
    const sleepCards = Array.from(document.querySelectorAll("._nSlVqJ"));
    sleepCards.forEach((card, idx) => {
      (card as HTMLElement).style.cursor = "pointer";
      card.addEventListener("click", () => {
        openTour(idx === 0 ? "tour-room-3" : "tour-room-0");
      });
    });

    // Amenities Modal
    if (showAmenBtn && amenModal) {
      showAmenBtn.addEventListener("click", () => {
        amenModal.classList.add("_PjnNJs");
        document.body.classList.add("_pINcte");
      });
    }
    if (amenClose && amenModal) {
      amenClose.addEventListener("click", () => {
        amenModal.classList.remove("_PjnNJs");
        document.body.classList.remove("_pINcte");
      });
    }

    // Sticky Nav visibility on scroll
    const handleScroll = () => {
      if (!stickyNav) return;
      if (window.scrollY > 480) {
        stickyNav.classList.add("_fTQmRt");
      } else {
        stickyNav.classList.remove("_fTQmRt");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Description "Show more" toggle
    if (descMoreBtn && descText) {
      descMoreBtn.addEventListener("click", () => {
        descText.style.maxHeight = "none";
        descText.style.webkitMaskImage = "none";
        descText.style.setProperty("mask-image", "none");
        descMoreBtn.style.display = "none";
      });
    }

    // Similar stays carousel controls
    if (simTrack) {
      if (simNext) {
        simNext.addEventListener("click", () => {
          simTrack.scrollBy({ left: 340, behavior: "smooth" });
          if (simPrev) simPrev.disabled = false;
        });
      }
      if (simPrev) {
        simPrev.addEventListener("click", () => {
          simTrack.scrollBy({ left: -340, behavior: "smooth" });
        });
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", syncFromUrl);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        ._toiEJx, #showAllPhotos, ._GXrMIo, ._gKVFNL, #tourBack, #lbClose, #lbPrev, #lbNext, #lbGrid, #showAmen, #amenClose, ._nSlVqJ, ._yWwrkC, ._kxdode, ._hCwPJL a {
          cursor: pointer !important;
        }
      `
    }} />
  );
}
