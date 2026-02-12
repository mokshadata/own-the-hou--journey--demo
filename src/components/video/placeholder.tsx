export default function VideoPlaceholder({ src, alt, slug }) {
    return <figure class="video-placeholder home-buyer--cover map--decision" style={{'background-image': `url(${src.src});`}}>
        <span class="map--decision--cover--background"></span>
        <figcaption><a name={slug} id={slug}>{alt}</a></figcaption>
        {/* <img src={src.src} alt={alt} title={alt}/> */}
    </figure>
}