import { Show } from "solid-js";
import { isSearchForFullMap } from "~/store/navigation";
export default function ExploreAllMessage() {
  return (<Show when={!isSearchForFullMap()}>
    <p>Your steps and chapters on the left is customized to your journey. To switch between all steps and your custom steps, toggle the "Explore all" switch at the top of the chapters list.</p>
  </Show>)
}