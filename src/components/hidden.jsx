import React from "react";

function BadgeIcon({ width = "150", height = "150", color = "#D9D9D9" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="150" height="150" rx="40" fill={color} />
    </svg>
  );
}

export default BadgeIcon;
