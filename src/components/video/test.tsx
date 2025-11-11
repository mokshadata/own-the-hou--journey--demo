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

export default function Test() {
  return (
    <>
        <div class="w-full flex justify-between align-middle">
          <p class="text-xs font-mono content-center">
            {formatSeconds(videoTime())} | {formatSeconds(videoDuration())}
          </p>
          <p>
            {videoPlaybackSpeed()}
          </p>
        </div>
    </>
  );
}