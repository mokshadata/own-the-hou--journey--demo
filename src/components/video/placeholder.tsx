export default function VideoPlaceholder({ src, alt, slug }) {
    return <figure class="video-placeholder">
        <figcaption><a name={slug} id={slug}>{alt}</a></figcaption>
        <img src={src.src} alt={alt} title={alt}/>
    </figure>
}