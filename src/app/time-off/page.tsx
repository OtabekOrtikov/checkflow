import { redirect } from "next/navigation";

export default function TimeOffIndexPage() {
  redirect("/time-off/pending");
}