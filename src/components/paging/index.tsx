import { lazy, Suspense } from "solid-js";
import PagingSkeleton from "./skeleton";

const Paging = lazy(() => import('./component'))

export default function ({
  chapter,
  module,
  nextPage,
  nextPageOptions,
  prevPage,
  baseURL,
  journeyMap,
  section,
}) {
    return (
    <Suspense fallback={<PagingSkeleton
      chapter={chapter}
      nextPage={() => (nextPage)}
      prevPage={prevPage}
      baseURL={baseURL}
    />}>
        <Paging
          module={module}
          chapter={chapter}
          section={section}
          nextPage={nextPage}
          nextPageOptions={nextPageOptions}
          prevPage={prevPage}
          baseURL={baseURL}
          journeyMap={journeyMap}
        />
    </Suspense>
    )
}