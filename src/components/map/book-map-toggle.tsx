import {
  showAllMap, setShowAllMap, isSearchForFullMap,
} from "../../store/navigation"
import { Show } from "solid-js"

export default function BookMapToggle() {

  const updateShowHide = (changeEvent) => {
    setShowAllMap(changeEvent.target.checked)
  }

  return (
    <Show when={!isSearchForFullMap()}>
      <fieldset>
        <label>
          <input name="map-show" type="checkbox" role="switch" checked={showAllMap()} onChange={updateShowHide}/>
          {/* {showAllMap() && 'All content. Click to return to personal map' || 'Click to explore all'} */}
          Explore all
        </label>
      </fieldset>
    </Show>
  );
}
