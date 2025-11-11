import { createEffect, Show } from "solid-js"

import {
  currentVideo,
  setVideoDuration, videoDuration,
  setVideoTime, videoTime,
  setPlaybackSpeed, videoPlaybackSpeed,
  setVideoLastLoaded, videoLastLoaded,
  setVideoHeight,
  currentSelectedWord,
  formatSeconds
} from '../../store/video'

export default function VideoPlayer({ src, id }) {
  let videoDOMEl;

  createEffect(() => {
    videoDOMEl.currentTime = currentSelectedWord().start || 0
    videoDOMEl.play()

    return currentSelectedWord()
  })


  createEffect(() => {
    if (videoLastLoaded() > 0) {
      setVideoHeight(videoDOMEl.videoHeight)
    }
    return videoLastLoaded()
  })

  createEffect(() => {
    console.log('playback speed updated')
    videoDOMEl.playbackRate = videoPlaybackSpeed()
    return videoPlaybackSpeed()
  })

  return (
    <>
      <video
        src={src}
        id={id}
        width={"100%"}
        height={"auto"}
        controls
        plays-inline
        ref={(el) => {
          console.log("HELLO REF")
          videoDOMEl = el;
          videoDOMEl.addEventListener("loadeddata", (event) => {
            console.log('HELLO')
            setVideoLastLoaded(event.timeStamp);
            setVideoDuration(videoDOMEl.duration);
          });
          videoDOMEl.addEventListener("timeupdate", (event) => {
            console.log('BYE')
            setVideoTime(videoDOMEl.currentTime);
          });
        }}
      ></video>
      <Show when={true}>
        <div class="w-full flex justify-between align-middle">
          <p class="text-xs font-mono content-center">
            {formatSeconds(videoTime())} | {formatSeconds(videoDuration())}
          </p>
          <form>
            <select
              class="
                  bg-gray-50 border
                  border-gray-300
                  text-gray-900
                  text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
              onChange={(changeEvent) => {
                setPlaybackSpeed(changeEvent.target.value * 1);
              }}
            >
              {[0.5, 1, 1.5, 2, 3, 4].map((speed) => (
                <option
                  value={speed}
                  selected={videoPlaybackSpeed() === speed * 1}
                >
                  {speed}x
                </option>
              ))}
            </select>
          </form>
        </div>
      </Show>
    </>
  );
}
