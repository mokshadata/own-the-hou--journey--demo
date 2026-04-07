

export default function YoutubePlayer(props) {
  return (
    <iframe
      width="560"
      height="315"
      src={props.baseSource.replace('youtube.com', 'youtube-nocookie.com')}
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