import { createSignal, createMemo, createResource, createEffect, Show} from "solid-js";

export default function VideoPlaceholder({ src, alt, slug }) {
    let videoDOMEl;

    const [hasPlayed, setHasPlayed] = createSignal(false)
    const [status, setStatus] = createSignal('loading')
    const [videoLastLoaded, setVideoLastLoaded] = createSignal(0)
    const [videoDuration, setVideoDuration] = createSignal(0)

    const [videoTime, setVideoTime] = createSignal(0)
    const [playbackSpeed, setPlaybackSpeed] = createSignal(1)
    const [transcriptLanguage, setTranscriptLanguage] = createSignal('en-US')

    createEffect(() => {
        return status()
    })

    return <figure class={`video-placeholder ${hasPlayed() && 'video--has-played' || 'video--has-not-played'} video--${status()}`}>
        <figcaption><a name={slug} id={slug}>{alt}</a></figcaption>
        <div class="video--area">
            <Show when={status() === 'loading'}>
                <img src={`${src}thumbnail.png`} alt={alt} title={alt}/>
            </Show>
            <video
                crossorigin="anonymous"
                src={`${src}video.mp4`}
                poster={`${src}thumbnail.png`}
                controls
                plays-inline
                ref={(el) => {
                    videoDOMEl = el;
                    videoDOMEl.addEventListener("loadeddata", (event) => {
                        setVideoLastLoaded(event.timeStamp);
                        setVideoDuration(videoDOMEl.duration);

                        setStatus('loaded')
                    });
                    videoDOMEl.addEventListener("timeupdate", (event) => {
                        setVideoTime(videoDOMEl.currentTime);

                        setHasPlayed(true)
                        setStatus('playing')
                    });
                }}
            >
                <track default kind="captions" src={`${src}transcript.vtt`} srclang="en" />
            </video>
        </div>
    </figure>
}