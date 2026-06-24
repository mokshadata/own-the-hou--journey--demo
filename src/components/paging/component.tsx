import { createEffect, createSignal } from "solid-js";
// import * as i18n from "@solid-primitives/i18n";
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

  const [locale, setLocale] = createSignal(document.documentElement.lang);
  const localedURL = () => (
    locale() && locale() !== 'en' && `${baseURL}${locale()}/` || baseURL
  )

  const nextPageGetter = () => (
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
    const isDynamicNextPageInPages = nextPageGetter() && pageLookup().find(({ params }) => (params.chapter === nextPageGetter().params.chapter && params.section === nextPageGetter().params.section && params.module === nextPageGetter().params.module)) || false
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

  const prevPageGetter = () => {
    if (!pagesDynamic().props.prevPage) {
      return pagesDynamic().props.prevPage
    }
    return {
      moduleOrder: ((pagesDynamic().props.prevPage.params.module || '').split('-')[0] || '').replace('m', '') * 1,
      ...pagesDynamic().props.prevPage,
    }
  }

  const nextPageGetterDyn = () => {
    if (!pagesDynamic().props.nextPage) {
      return pagesDynamic().props.nextPage
    }
    return {
      moduleOrder: ((pagesDynamic().props.nextPage.params.module || '').split('-')[0] || '').replace('m', '') * 1,
      ...pagesDynamic().props.nextPage,
    }
  }
  
  createEffect(() => {
    console.log({
      dynamic: pagesDynamic(),
      nextPageGetterDyn: nextPageGetterDyn(),
      nextPageGetter: nextPageGetter(),
      nextPage: nextPage,
      locale: locale(),
    })
  })


  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-chapter={chapter}
    >
      <div>
        {prevPageGetter() && (
          <a
            role="button"
            aria-label="Previous"
            href={`${localedURL()}chapters/${[prevPageGetter().params.chapter, prevPageGetter().params.section, prevPageGetter().params.module].filter((param) => (param)).join('/')}/${window.location.search}`}
          >
            <div>
              {/* <small>{(chapter !== prevPageGetter().params.chapter) && <strong>{prevPageGetter().props.chapterTitle}</strong> || <></>} {false && <i>{prevPageGetter().props.sectionTitle}</i> || <></>}</small> */}
              {(chapter !== prevPageGetter().params.chapter) && <strong>{prevPageGetter().props.chapterTitle}</strong> || <></>} <strong>{prevPageGetter().props.siblings === 1 && prevPageGetter().props.sectionTitle || prevPageGetter().props.moduleTitle}</strong>
            </div>
          </a>
        ) || <></>}
      </div>
      <div>
        {nextPageGetterDyn() && (
          <a
            role="button"
            aria-label="Next"
            href={`${localedURL()}chapters/${[nextPageGetterDyn().params.chapter, nextPageGetterDyn().params.section, nextPageGetterDyn().params.module].filter((param) => (param)).join('/')}/${window.location.search}`}
          >
            <div>
              {/* <small>{(chapter !== nextPageGetterDyn().params.chapter) && <strong>{nextPageGetterDyn().props.chapterTitle}</strong> || <></>} {false && <i>{nextPageGetter().props.sectionTitle}</i> || <></>}</small> */}
              {(chapter !== nextPageGetterDyn().params.chapter) && <strong>{nextPageGetterDyn().props.chapterTitle}</strong> || <></>} <strong>{nextPageGetterDyn().props.moduleOrder === 1 && nextPageGetterDyn().props.sectionTitle || nextPageGetterDyn().props.moduleTitle}</strong>
            </div>
          </a>
        ) || <></>}
      </div>
    </nav>
  )
}
