import React, { useState, useRef } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";

const VideoCard = ({ videoSrc, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const modalVideoRef = useRef(null);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Pause the thumbnail video when opening modal
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Pause the modal video when closing
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  };

  return (
    <>
      {/* Video Card */}
      <div className="relative group bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Video */}
        <div className="relative aspect-[9/16] overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={isMuted}
            loop
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleMute}
                className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
              <button
                onClick={openModal}
                className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300"
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-gray-300 text-xs line-clamp-2">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.95)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90vw",
            height: "90vh",
            maxWidth: "800px",
            outline: "none",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.6)",
              zIndex: 1,
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.8)",
              },
            }}
          >
            <X className="w-6 h-6" />
          </IconButton>

          {/* Modal Video */}
          <video
            ref={modalVideoRef}
            className="w-full h-full object-contain rounded-lg"
            controls
            autoPlay
            loop
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      </Modal>
    </>
  );
};

export default VideoCard;
