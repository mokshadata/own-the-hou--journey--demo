import { nextPageByDecision, } from "../../store/navigation";
import PageButton from "./button";

export default function Paging({
  module,
  chapter,
  nextPage,
  nextPageOptions,
  prevPage,
  baseURL,
}) {
  const nextPageGetter= () => (
    module &&
    nextPageOptions.length &&
    nextPageByDecision(module) &&
    nextPageOptions.find((page) => (page.params.module === nextPageByDecision(module))) ||
    nextPage
  )

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-chapter={chapter}
    >
      <div>
        {prevPage && <PageButton relativePosition="Previous" baseURL={baseURL} {...prevPage.params} {...prevPage.props} /> || <></>}
      </div>
      <div>
        {nextPage && (
          <a
            role="button"
            aria-label="Next"
            href={`${baseURL}chapters/${[nextPageGetter().params.chapter, nextPageGetter().params.section, nextPageGetter().params.module].filter((param) => (param)).join('/')}/`}
          >
            <div>
              <small><strong>{nextPageGetter().props.chapterTitle}</strong> <i>{nextPageGetter().props.sectionTitle}</i></small>
              <strong>{nextPageGetter().props.moduleTitle}</strong>
            </div>
          </a>
        ) || <></>}
      </div>
    </nav>
  )
}
