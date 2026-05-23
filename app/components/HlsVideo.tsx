"use client";

import { useEffect, useRef } from "react";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  overlayOpacity?: string; // e.g. "bg-black/20"
}

export default function HlsVideo({ className = "", style, overlayOpacity = "bg-black/20" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: import("hls.js").default | null = null;

    const init = async () => {
      const Hls = (await import("hls.js")).default;
      if (Hls.isSupported()) {
        hlsInstance = new Hls({ enableWorker: false });
        hlsInstance.loadSource(HLS_SRC);
        hlsInstance.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
      }
    };

    init();

    return () => {
      hlsInstance?.destroy();
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={style}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      {/* Dark overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />
    </div>
  );
}
