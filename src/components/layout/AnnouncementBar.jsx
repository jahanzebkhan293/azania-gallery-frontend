import { useEffect, useState } from "react";

function AnnouncementBar() {
  const announcements = [
    "Welcome to AZANIA GALLERY",
    "Timeless Elegance, Thoughtfully Curated",
    "Discover Jewelry Made to Be Remembered",
  ];

  const [activeAnnouncement, setActiveAnnouncement] =
    useState(0);

  const [isVisible, setIsVisible] =
    useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Change announcement after fade out
      const timeout = setTimeout(() => {
        setActiveAnnouncement(
          (currentIndex) =>
            (currentIndex + 1) %
            announcements.length
        );

        // Fade in
        setIsVisible(true);
      }, 350);

      return () => {
        clearTimeout(timeout);
      };
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [announcements.length]);

  return (
    <div
      className="announcement-bar"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        style={{
          display: "inline-block",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "translateY(0)"
            : "translateY(-5px)",
          transition:
            "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {announcements[activeAnnouncement]}
      </span>
    </div>
  );
}

export default AnnouncementBar;