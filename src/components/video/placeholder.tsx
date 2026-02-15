import ScreenshotMeetYourCounselor from '../../assets/videos/video-9.png'
import Transcript from '../../assets/videos/video-9.txt'

import { createSignal, createMemo, createResource, createEffect, Show} from "solid-js";
import { createStore } from "solid-js/store";

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
        console.log(status())
        return status()
    })

    return <figure class={`video-placeholder ${hasPlayed() && 'video--has-played' || 'video--has-not-played'} video--${status()}`}
    //  style={{'background-image': `url(${src.src});`}}
     >
        {/* <span class="map--decision--cover--background"></span> */}
        <figcaption><a name={slug} id={slug}>{alt}</a></figcaption>
        <div class="video--area">
            <Show when={status() === 'loading'}>
                <img src={ScreenshotMeetYourCounselor.src} alt={alt} title={alt}/>
            </Show>
            <video
                src="https://ownthehou.s3.us-east-2.amazonaws.com/Video+9+-+Meet+Your+Counselor+-+med.mp4"
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
                <track default kind="captions" src={Transcript} srclang="en" />
            </video>
        </div>
    </figure>
}