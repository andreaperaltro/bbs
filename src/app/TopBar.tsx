"use client";
import React, { useEffect, useState } from "react";

interface Location {
  city?: string;
  country_name?: string;
}

export default function TopBar() {
  const [location, setLocation] = useState<Location | null>(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    fetch("https://ipinfo.io/json")
      .then((res) => res.json())
      .then((data) => setLocation({ city: data.city, country_name: data.country }))
      .catch(() => setLocation({ city: undefined, country_name: undefined }));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateString = `${days[date.getDay()]} ${date.getDate().toString().padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`;
  const timeString = date.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="w-full bg-bbs-bg text-bbs-cyan text-xs py-1 px-2 border-b border-bbs-magenta flex items-center justify-between font-[amiga4ever]">
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