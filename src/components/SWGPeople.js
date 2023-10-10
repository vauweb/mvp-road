import React from "react";

export function SWGPeople({color = "#9fda0a", head = "#000000"}) {
  return <g className="people_walk_path">
    <g className="people_walk_leg">
      <circle cx="-15" cy="-15" r="10" fill={color} stroke="black" strokeWidth="1"/>
      <circle cx="15" cy="15" r="10" fill={color} stroke="black" strokeWidth="1"/>
    </g>
    <g transform="scale(1, 0.4)">
      <circle cx="0" cy="0" r="40" fill={color} stroke="black" strokeWidth="1"/>
    </g>


    <circle cx="0" cy="0" r="18" fill={head} stroke="black" strokeWidth="1"/>
  </g>
}