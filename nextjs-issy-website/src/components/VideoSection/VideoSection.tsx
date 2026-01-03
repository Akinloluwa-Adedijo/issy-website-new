// // components/VideoPlayer.tsx
// interface VideoPlayerProps {
//   src: string;
//   poster?: string;
//   className?: string;
//   aspectRatio?: "video" | "square" | string; // "video" (16:9), "square", or custom like "4/3"
//   autoPlay?: boolean;
//   muted?: boolean;
//   loop?: boolean;
// }

// export default function VideoPlayer({
//   src,
//   poster,
//   className = "",
//   aspectRatio = "video",
//   autoPlay = false,
//   muted = false,
//   loop = false,
// }: VideoPlayerProps) {
//   return (
//     <div className={`aspect-${aspectRatio} w-full ${className}`}>
//       <video
//         className="w-full h-full object-cover rounded-lg"
//         controls
//         preload="metadata"
//         poster={poster}
//         autoPlay={autoPlay}
//         muted={muted}
//         loop={loop}
//         playsInline // important for mobile
//       >
//         <source src={src} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }
// components/VideoPlayer.tsx
"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps {
  vidSrc: string;
  poster?: string;
  className?: string;
  aspectRatio?: "video" | "square" | string;
}

export default function VideoPlayer({
  vidSrc,
  poster,
  className = "",
  aspectRatio = "video",
}: VideoPlayerProps) {
  const [showPlayButton, setShowPlayButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

  return (
    <div className={`relative aspect-${aspectRatio} w-full ${className}`}>
      <video
        ref={videoRef}
        className="inset-0 w-full h-full object-cover rounded-lg"
        controls={!showPlayButton} // Only show controls after play button is clicked
        preload="metadata"
        poster={poster}
        playsInline
        onPlay={() => setShowPlayButton(false)}
        onPause={() => setShowPlayButton(true)}
        onEnded={() => setShowPlayButton(true)}
      >
        <source src={vidSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Play Button - Bigger */}
      {showPlayButton && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded-lg cursor-pointer"
          aria-label="Play video"
        >
          <div className="w-28 h-28 flex items-center justify-center bg-white/95 rounded-full shadow-2xl hover:scale-110 transition-transform">
            <svg
              className="w-14 h-14 text-gray-900 ml-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
