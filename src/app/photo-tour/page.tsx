import { redirect } from "next/navigation";

export default function PhotoTourPage() {
  redirect("/?modal=PHOTO_TOUR_SCROLLABLE");
}
