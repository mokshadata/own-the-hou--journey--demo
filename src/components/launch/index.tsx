import { personalJourneyPath } from "../../store/navigation"
import JourneyMap from "../map/component"

import { createEffect, Show } from "solid-js"

export default function StepLauncher({ journeyMap, base_url }) {
  const resultPath = () => (personalJourneyPath() && personalJourneyPath().type || null)
  
  return (
    <div class="journey-results">
      <div class="row">
        <Show when={resultPath() === 'results-toolkit'}>
          <div class="col-xs-6 journey-map-results--intro">
            <h1>Your Own the Hou Journey</h1>
            <Show when={personalJourneyPath().key === 'journey--homebuyer--result--00'}>
              <p>The toolkit walks through the entire homebuying process step by step. You can find the steps that are right for you, and your current stage of the homebuying process, by exploring our map and seeing what elements look interesting right now. Then:</p>
              <ul>
                <li>
                  Explore the steps in the toolkit at your own pace.
                </li>
                <li>
                  Take in the information a little at a time to avoid getting overwhelmed.
                </li>
                <li>
                  Feel free to come back to this page and fill out the questionnaire if you’d like suggestions on where to start. 
                </li>
              </ul>
              <a role="button" href={`${base_url}`}>Take me to the Toolkit!</a>
            </Show>
            <Show when={personalJourneyPath().key !== 'journey--homebuyer--result--00'}>
              <p>Here's your personalized roadmap for your homebuying journey.</p>
              <p>The toolkit walks through the entire homebuying process step by step. These are the chapters we recommend you read first for your current progress.</p>
              <a role="button" href={`${base_url}`}>Take me to my personalized Toolkit!</a>
            </Show>
          </div>
          <nav class="col-xs-6">
            <aside class="menu journey-map" data-mode="map">
              <JourneyMap journeyMap={journeyMap} base_url={base_url}/>
            </aside>
          </nav>
        </Show>
        <Show when={resultPath() === 'results-about-class'}>
          <div class="col-xs-6 journey-map-results--intro">
            <h1>Homebuying Course</h1>
            <p>If you’re someone who wants in-person guidance, Own the HOU recommends starting with an in-depth homebuying class taught by a HUD-certified Homeownership Counselor. These 8-hour classes walk through every step of the process. Once you complete the class, counselors are available to provide one-on-one guidance at no cost.</p>
            <a role="button" href="https://ownthehoustg.wpenginepowered.com/homebuyer-education-courses/">Look for a local course!</a>
          </div>
          <div class="col-xs-6">
            Photo here
          </div>
        </Show>
      </div>
    </div>
  )
}