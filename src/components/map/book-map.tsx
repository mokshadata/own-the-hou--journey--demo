import {
  personalJourneySections, checkChapterWithJourney,
  searchParamsToChoices, settersByName, setIsSetFromLink,
  isSetFromLink, showAllMap, setShowAllMap, isSearchForFullMap,
} from "../../store/navigation"
import { createEffect, createSignal } from "solid-js"

export default function JourneyBookMap({
  journeyMap,
  activeChapter,
  activeSection,
  activePage,
  base_url,
}) {

  createEffect(() => {
    if (!isSetFromLink()) {
      searchParamsToChoices().forEach((choice) => {
        settersByName[choice.key](choice.option)
      });

      setIsSetFromLink(true)
    }
    return searchParamsToChoices()
  })

  const updateShowHide = (changeEvent) => {
    setShowAllMap(changeEvent.target.checked)
  }

  const yourJourneyMap = () => {
    return journeyMap.map(checkChapterWithJourney)
  }

  const anyPartialChapters = () => (yourJourneyMap().find((topLevel) => (topLevel.isChapterIncluded && !topLevel.isFullChapterIncluded)))

  return (
    <div class="menu-wrapper">
    {!isSearchForFullMap() && (<fieldset>
      <label>
        <input name="map-show" type="checkbox" role="switch" checked={showAllMap()} onChange={updateShowHide}/>
        {/* {showAllMap() && 'All content. Click to return to personal map' || 'Click to explore all'} */}
        Explore all
      </label>
    </fieldset>) || <></>}
    <aside class="menu journey-map" data-mode="side">
      <ol class="menu-list">
        {yourJourneyMap().map((topLevel) => (
          <li>
            <a
              role="link"
              data-menu-type="chapter"
              class={(topLevel.chapter === activeChapter && "is-active") || ""}
              href={`${base_url}chapters/${topLevel.chapter}/${window.location.search}`}
              style={{
                opacity: topLevel.isChapterIncluded && 1 || (showAllMap() && 1) || 0,
                display: topLevel.isChapterIncluded && 'block' || (showAllMap() && 'block') || 'none',
              }}
            >
              <div>{topLevel.title}</div>
            </a>
            <ol
              class={(topLevel.chapter !== activeChapter && "is-hidden") || ""}
            >
              {topLevel.sections.map((midLevel) => (
                <li>
                  <a
                    role="link"
                    data-menu-type="section"
                    class={
                      (midLevel.section === activeSection && "is-active") || ""
                    }
                    href={`${base_url}chapters/${topLevel.chapter}/${
                      midLevel.section
                    }/${
                      (midLevel.modules.length &&
                        `${midLevel.modules[0].module}/`) ||
                      ""
                    }${window.location.search}`}
                    style={{
                      opacity: midLevel.isSectionIncluded && 1 || (showAllMap() && 1) || 0,
                      display: topLevel.isChapterIncluded && 'block' || (showAllMap() && 'block') || 'none',
                    }}
                  >
                    {midLevel.title}
                  </a>
                  {midLevel.modules.length > 1 && (
                    <ol>
                      {midLevel.modules
                        .filter((pageLevel) => pageLevel.item)
                        .map((pageLevel) => (
                          <li>
                            <a
                              role="link"
                              data-menu-type="page"
                              class={
                                (pageLevel.module === activePage &&
                                  "is-active") ||
                                ""
                              }
                              href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${pageLevel.module}/${window.location.search}`}
                            >
                              {pageLevel.item.data.name}
                            </a>
                          </li>
                        ))}
                    </ol>
                  )}
                </li>
              ))}
              <li>
                <a
                  role="link"
                  data-menu-type="section"
                  class={("Review" === activeSection && "is-active") || ""}
                  href={`${base_url}chapters/${topLevel.chapter}/review/${window.location.search}`}
                >
                  Check-In
                </a>
              </li>
            </ol>
          </li>
        ))}
      </ol>
    </aside>
    </div>
  );
}
