import { createEffect } from "solid-js";
import { nextPageByDecision, checkChapterWithJourney, mapStructureToPages, showAllMap } from "../../store/navigation";
import PageButton from "./button";

export default function Paging({
  module,
  chapter,
  section,
  nextPage,
  nextPageOptions,
  prevPage,
  baseURL,
  journeyMap,
}) {
  const nextPageGetter= () => (
    module &&
    nextPageOptions.length &&
    nextPageByDecision(module) &&
    nextPageOptions.find((page) => (page.params.module === nextPageByDecision(module))) ||
    nextPage
  )

  const yourJourneyMap = () => {
    return journeyMap.map(checkChapterWithJourney)
  }

  const pages = () => (
    yourJourneyMap()
      .filter((chapter) => (chapter.isChapterIncluded)).map((chapter) => ({
        ...chapter,
        sections: chapter.sections.filter((section) => (section.isSectionIncluded))
      }))
  )

  const pageLookup = () => (
    mapStructureToPages(pages())
  )

  const pagesDynamic = () => {
    const isDynamicNextPageInPages = pageLookup().find(({ params }) => (params.chapter === nextPageGetter().chapter && params.section === nextPageGetter().section && params.module === nextPageGetter().module))
    const setup = !showAllMap() && pageLookup().find(({ params }) => (params.chapter === chapter && params.section === section && params.module === module)) ||
    {
      props: {
        nextPage,
        prevPage,
      }
    }

    if (isDynamicNextPageInPages) {
      setup.props.nextPage = nextPageGetter()
    }

    return setup
  }

  const prevPageGetter = () => (
    pagesDynamic().props.prevPage
  )

  const nextPageGetterDyn = () => (
    pagesDynamic().props.nextPage
  )


  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-chapter={chapter}
    >
      <div>
        {prevPageGetter() && <PageButton relativePosition="Previous" baseURL={baseURL} {...prevPageGetter().params} {...prevPageGetter().props} currentChapter={chapter} /> || <></>}
      </div>
      <div>
        {nextPage && (
          <a
            role="button"
            aria-label="Next"
            href={`${baseURL}chapters/${[nextPageGetterDyn().params.chapter, nextPageGetterDyn().params.section, nextPageGetterDyn().params.module].filter((param) => (param)).join('/')}/${window.location.search}`}
          >
            <div>
              <small>{(chapter !== nextPageGetterDyn().params.chapter) && <strong>{nextPageGetterDyn().props.chapterTitle}</strong> || <></>} {false && <i>{nextPageGetter().props.sectionTitle}</i> || <></>}</small>
              <strong>{nextPageGetter().props.moduleTitle}</strong>
            </div>
          </a>
        ) || <></>}
      </div>
    </nav>
  )
}
