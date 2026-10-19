import { createSignal } from "solid-js"

export default function Checklist(props) {
  const [locale, setLocale] = createSignal(document.documentElement.lang);
  
  return (
    <iframe
      id={props.slug}
      src={`/checklists/Own the Hou - ${props.title} - checklist - ${locale()}.pdf`}
      title={props.title}
      width="100%" height="500px"></iframe>
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