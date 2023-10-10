import React from "react";

export function SWGLight({red = false, yellow = false, green = false}) {
  return <g>
    <rect x="-15" y="-45" width="30" height="90" rx="5" fill="black" strokeWidth="1" stroke="white"/>
    <circle cx="0" cy="-30" r="14" fill={red ? '#FF0000' : '#000000'} stroke="white" strokeWidth="0"/>
    <circle cx="0" cy="0" r="14" fill={yellow ? '#FFFF00' : '#000000'} stroke="white" strokeWidth="0"/>
    <circle cx="0" cy="30" r="14" fill={green ? '#00FF00' : '#000000'} stroke="whites" strokeWidth="0"/>
  </g>;
}