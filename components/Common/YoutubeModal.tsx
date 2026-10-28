"use client";

import { useEffect, useMemo } from "react";

type YoutubeModalProps = {
  isOpen: boolean;
  videoId: string;
  onClose: () => void;
  /** Kept for drop-in compatibility with react-modal-video callers. */
  channel?: string;
  youtube?: { mute?: number; autoplay?: number };
};

function extractYoutubeId(input: string): string {
  const value = (input || "").trim();
  if (!value) return "";
  if (/^[\w-]{11}$/.test(value)) return value;

  try {
    const url = new URL(value);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "").slice(0, 11);
    }
    const fromQuery = url.searchParams.get("v");
    if (fromQuery) return fromQuery;
    const embed = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embed?.[1]) return embed[1];
  } catch {
    // not a URL — fall through
  }

  const match = value.match(/(?:v=|\/)([\w-]{11})(?:\?|&|$)/);
  return match?.[1] || value;
}

export default function YoutubeModal({
  isOpen,
  videoId,
  onClose,
  youtube,
}: YoutubeModalProps) {
  const id = useMemo(() => extractYoutubeId(videoId), [videoId]);
  const autoplay = youtube?.autoplay ? 1 : 0;
  const mute = youtube?.mute ? 1 : 0;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !id) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
        padding: 16,
      }}
    >
      <button
        type="button"
        aria-label="Close video"
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          border: 0,
          background: "transparent",
          color: "#fff",
          fontSize: 28,
          lineHeight: 1,
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(960px, 100%)",
          aspectRatio: "16 / 9",
          background: "#000",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <iframe
          title="YouTube video"
          src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay}&mute=${mute}&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </div>
  );
}
