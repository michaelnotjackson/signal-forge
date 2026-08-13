import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export async function loader(_ : Route.LoaderArgs) {
  return redirect("dashboard");
}

export default function Index() {
  return null;
}