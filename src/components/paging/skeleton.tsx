
import PageButton from "./button"

export default function PaginationSkeleton({ chapter, prevPage, nextPage, baseURL }) {
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
        {nextPage && <PageButton relativePosition="Next" baseURL={baseURL} {...nextPage.params} {...nextPage.props} /> || <></>}
      </div>
    </nav>
  )
}