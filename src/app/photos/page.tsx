import { redirect } from "next/navigation";

export default function PhotosPage() {
  redirect("/?modal=PHOTO_TOUR_SCROLLABLE");
}
