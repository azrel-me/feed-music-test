"use client";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import {useRef, useEffect} from "react";
import Player from "video.js/dist/types/player";

const videoJsOptions = {
  autoplay: true,
  controls: false,
  muted: true,
  loop: true,
  shadow: !0,
  shadowAlpha: 0.3,
  responsive: true,
  sources: [
    {
      src: "/intro.mp4",
      type: "video/mp4",
    },
    {type: "video/webm", src: "videos/intro.webm"},
  ],
};

export const VideoJS = () => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log("player is ready");
      });
    } else {
      const player = playerRef.current;

      player.autoplay(videoJsOptions.autoplay);
      player.src(videoJsOptions.sources);
    }
  }, [videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      className="h-full relative bg-black before:absolute before:inset-0 before:bg-black/40 before:z-10 animate-in fade-in [&>.video-js]:absolute [&>.video-js]:!w-full [&>.video-js]:!h-full inset-0"
      ref={videoRef}
    />
  );
};

export default VideoJS;
