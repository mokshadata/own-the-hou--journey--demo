import { personalJourneySections, checkChapterWithJourney } from "../../store/navigation"

export default function JourneyBookMap({
  journeyMap,
  activeChapter,
  activeSection,
  activePage,
  base_url,
}) {
  const yourJourneyMap = () => {
    return journeyMap.map(checkChapterWithJourney)
  }

  const anyPartialChapters = () => (yourJourneyMap().find((topLevel) => (topLevel.isChapterIncluded && !topLevel.isFullChapterIncluded)))

  return (
    <aside class="menu journey-map" data-mode="side">
      <ol class="menu-list">
        {yourJourneyMap().map((topLevel) => (
          <li>
            <a
              role="link"
              data-menu-type="chapter"
              class={(topLevel.chapter === activeChapter && "is-active") || ""}
              href={`${base_url}chapters/${topLevel.chapter}/`}
              style={{
                opacity: topLevel.isChapterIncluded && 1 || 0.5,
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
                    }`}
                    style={{
                      opacity: midLevel.isSectionIncluded && 1 || 0.5,
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
                              href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${pageLevel.module}/`}
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
                  href={`${base_url}chapters/${topLevel.chapter}/review/`}
                >
                  Check-In
                </a>
              </li>
            </ol>
          </li>
        ))}
      </ol>
    </aside>
  );
}
