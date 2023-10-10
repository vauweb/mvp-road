import React from "react";

export function SWGAuto({color = "#da0a0a"}) {
  return <g className="car_path">
    <rect x="0" y="-100" width="500" rx="20" height="200" fill={color} stroke="black" strokeWidth="3"/>
    <rect x="120" y="-100" width="300" rx="20" height="200" fill="#99f2da" stroke="black" strokeWidth="3"/>
    <rect x="180" y="-100" width="200" rx="20" height="200" fill={color} stroke="black" strokeWidth="3"/>
  </g>
}