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
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => setLocation({ city: data.city, country_name: data.country_name }))
      .catch(() => setLocation(null));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateString = `${days[date.getDay()]} ${date.getDate().toString().padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`;
  const timeString = date.toLocaleTimeString();

  return (
    <div className="w-full bg-white text-black text-xs py-1 px-2 border-b border-gray-300 flex items-center justify-between">
      <span>
        {location
          ? `${location.city ? location.city + ", " : ""}${location.country_name ? location.country_name : ""}`
          : "Locating..."}
      </span>
      <span>{dateString}</span>
      <span>{timeString}</span>
    </div>
  );
} 