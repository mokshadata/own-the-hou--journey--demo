import { lazy, Suspense } from "solid-js";
import QuestionnaireSkeleton from "./skeleton";

const Questionnaire = lazy(() => import('./component'))

export default function () {
    return (
    <Suspense fallback={<QuestionnaireSkeleton
      questions={[]}
    />}>
        <Questionnaire/>
    </Suspense>
    )
}