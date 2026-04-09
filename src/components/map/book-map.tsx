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

  const [isFullyLoaded, setIsFullyLoaded] = createSignal(false)

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

  const isCurrentMatching = () => {
    const matchingChapter = yourJourneyMap().find((topLevel) => (
      topLevel.chapter === activeChapter
    ))
    const matchingSection = (matchingChapter && matchingChapter.sections || []).find((midLevel) => (
      midLevel.section === activeSection
    ))
    return (matchingSection && matchingSection.isSectionIncluded) || (matchingChapter && matchingChapter.isChapterIncluded)
  }

  const earliestMatchingChapter = () => (yourJourneyMap().find((topLevel) => (topLevel.isChapterIncluded)))
  const earliestMatchingSection = () => (earliestMatchingChapter() && earliestMatchingChapter().sections || []).find((midLevel) => (midLevel.isSectionIncluded))
  const destination = () => (
    `${base_url}chapters/${earliestMatchingChapter().chapter}/${earliestMatchingSection().section}/${(
      earliestMatchingSection().modules.length &&
        `${earliestMatchingSection().modules[0].module}/`) ||
      ""}${window.location.search}`
  )

  const needsToRedirect = () => (
    // isFullyLoaded() &&
    !showAllMap() &&
    !isCurrentMatching()
  )
  
  createEffect(() => {
    if (needsToRedirect()) {
      window.location.href = `${window.location.origin}${destination()}`
    }
  })

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
        {yourJourneyMap()
          .filter((topLevel) => (topLevel.isChapterIncluded || showAllMap()))
          .map((topLevel) => (
          <li>
            <a
              role="link"
              data-menu-type="chapter"
              class={(topLevel.chapter === activeChapter && "is-active") || ""}
              href={`${base_url}chapters/${topLevel.chapter}/${window.location.search}`}
            >
              <div data-order={topLevel.order}>{topLevel.title}</div>
            </a>
            <ol
              class={(topLevel.chapter !== activeChapter && "is-hidden") || ""}
            >
              {topLevel.sections
                .filter((section)=> (section.isSectionIncluded || showAllMap()))
                .map((midLevel) => (
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
                  Review
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
