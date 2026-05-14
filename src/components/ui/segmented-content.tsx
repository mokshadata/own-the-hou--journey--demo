import { SegmentedControl } from "@kobalte/core/segmented-control";
import * as style from "./style.css";

import { For } from "solid-js";

export default function () {
  return (
    <SegmentedControl class={style["segmented-control"]} defaultValue="Apple">
      <SegmentedControl.Label class={style["segmented-control__label"]}>
        Favorite fruit
      </SegmentedControl.Label>
      <div class={style["segmented-control__wrapper"]} role="presentation">
        <SegmentedControl.Indicator class={style["segmented-control__indicator"]} />
        <div class={style["segmented-control__items"]} role="presentation">
          <For each={["Apple", "Orange", "Watermelon"]}>
            {(fruit) => (
              <SegmentedControl.Item value={fruit} class={style["segmented-control__item"]}>
                <SegmentedControl.ItemInput class={style["segmented-control__item-input"]} />
                <SegmentedControl.ItemLabel class={style["segmented-control__item-label"]}>
                  {fruit}
                </SegmentedControl.ItemLabel>
              </SegmentedControl.Item>
            )}
          </For>
        </div>
      </div>
    </SegmentedControl>
  );
}