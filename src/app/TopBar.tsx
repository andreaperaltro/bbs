"use client";
import React from "react";

interface Location {
  city?: string;
  country_name?: string;
}

export default function TopBar() {
  const [now, setNow] = React.useState<Date | null>(null);
  const [location, setLocation] = React.useState<Location | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data) => setLocation({ city: data.city, country_name: data.country }))
      .catch(() => setLocation({ city: undefined, country_name: undefined }));
  }, []);

  // Only render the time/date on the client
  if (!now) {
    return (
      <div
        className="w-full !bg-bbs-white !text-bbs-bg border-b border-bbs-magenta flex justify-between px-4 py-2 font-[amiga4ever] text-xs z-50 relative"
        style={{ background: '#fff', color: '#000' }}
      >
        <span>Location unknown</span>
        <span></span>
        <span></span>
      </div>
    );
  }

  // Format date as 'Mon 14 Jul 2025'
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateString = `${days[now.getDay()]} ${now.getDate().toString().padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const timeString = now.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <div
      className="w-full !bg-bbs-white !text-bbs-bg border-b border-bbs-magenta flex justify-between px-4 py-2 font-[amiga4ever] text-xs z-50 relative"
      style={{ background: '#fff', color: '#000' }}
    >
      <span>
        {location && (location.city || location.country_name)
          ? `${location.city ? location.city + ", " : ""}${location.country_name ? location.country_name : ""}`
          : "Location unknown"}
      </span>
      <span>{dateString}</span>
      <span>{timeString}</span>
    </div>
  );
} 