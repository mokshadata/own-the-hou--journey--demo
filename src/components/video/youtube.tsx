import { createSignal } from "solid-js"

export default function YoutubePlayer(props) {
  const [locale, setLocale] = createSignal(document.documentElement.lang);
  const localedURL = () => (
    props.slug === 'v--introduction-to-the-toolkit' && locale() === 'es' && `https://www.youtube-nocookie.com/embed/2AETizcpxvA?si=DiXFwVeVHJd3i_rq&cc_lang_pref=${locale()}-US&hl=${locale()}-US&cc_load_policy=1&list=PLpK0VohMQcnGvHcg77rylNk0vOfJH7yBv` ||
    `${props.baseSource.replace('youtube.com', 'youtube-nocookie.com')}&cc_lang_pref=${locale()}-US&hl=${locale()}-US&cc_load_policy=1&list=PLpK0VohMQcnGvHcg77rylNk0vOfJH7yBv`
  )

  return (
    <iframe
      width="560"
      height="315"
      src={localedURL()}
      title={props.alt}
      id={props.slug}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen

      loading="lazy"
    ></iframe>
  )
}