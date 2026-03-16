import ChapterIntroGraphic from "../diagrams/chapter-intro"
import { personalJourneySections, checkChapterWithJourney } from "../../store/navigation"
import { createEffect } from "solid-js"

export default function JourneyMap({ journeyMap, base_url }) {
  
  const yourJourneyMap = () => {
    return journeyMap.map(checkChapterWithJourney)
  }

  const anyPartialChapters = () => (yourJourneyMap().find((topLevel) => (topLevel.isChapterIncluded && !topLevel.isFullChapterIncluded)))

  return (<div class="menu-list">
      {
        yourJourneyMap().map((topLevel) => (
          <div
            class="frame"
          >
            {/* <ChapterIntroGraphic chapterID={topLevel.chapter}/> */}
            <a
              role="link"
              data-menu-type="chapter"
              data-destination={`${base_url}chapters/${topLevel.chapter}/`}
              style={{
                opacity: topLevel.isChapterIncluded && 1 || 0.5,
              }}
            >
              <div>
                {topLevel.title}
              </div>
            </a>
            {
              topLevel.isChapterIncluded &&
              anyPartialChapters() &&
              <ol>
              {topLevel.sections.map((midLevel) => (
                <li>
                  <a
                    role="link"
                    data-menu-type="section"
                    style={{
                      opacity: midLevel.isSectionIncluded && 1 || 0.5,
                    }}
                  >{midLevel.title}</a>
                  <ol>
                    {midLevel.modules.filter((pageLevel) => (pageLevel.item)).map((pageLevel) => (
                      <li>
                        <a
                          role="link"
                          data-menu-type="page"
                        >{pageLevel.item.data.name}</a>
                      </li>
                    ))}
                  </ol>
                </li>
              ))}

            </ol> || <></>}
          </div>
        ))
      }
  </div>)
}
