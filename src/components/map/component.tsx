import ChapterIntroGraphic from "../diagrams/chapter-intro"
import { journeyMapList } from "../../store/navigation"
import { createEffect } from "solid-js"

export default function JourneyMap({ journeyMap, base_url }) {

  const results = () => (journeyMapList().find((item) => (item.type === 'results')))
  
  const yourJourneyMap = () => {
    return journeyMap.map((topLevel) => ({
      ...topLevel,
      isFullChapterIncluded: results()?.options.includes(topLevel.chapter),
      isChapterIncluded: (((results()?.options.includes(topLevel.chapter) || topLevel.sections.find((midLevel) => (results()?.options.includes(midLevel.section)))) && true) || false),
      sections: topLevel.sections.map((midLevel) => ({
        ...midLevel,
        isSectionIncluded: (((results()?.options.includes(topLevel.chapter) || results()?.options.includes(midLevel.section)) && true) || false),
      }))
    }))
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
              href={`${base_url}chapters/${topLevel.chapter}/`}
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
                    href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${ midLevel.modules.length && `${midLevel.modules[0].module}/` || ''}`}
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
                          href={`${base_url}chapters/${topLevel.chapter}/${midLevel.section}/${pageLevel.module}/`}
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
