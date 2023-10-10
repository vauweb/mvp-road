import React from "react";
import {SWGAuto} from "./SWGAuto";
import {SWGPeople} from "./SWGPeople";
import './style.css';
import {SWGLight} from "./SWGLight";

export function RoadModel() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" style={{
    width: '100%', height: '100%', maxWidth: '100vw',
    maxHeight: '100vh'
  }}>
    <g transform="translate(960, 540)">
      <g transform="translate(0, 0)">
        <rect x="-150" y="-540" width="300" height="1080" fill="#424242"/>
      </g>
      <g transform="translate(0, 0)">
        <rect x="-960" y="-150" width="1920" height="300" fill="#2a2922"/>
        <line x1="-960" y1="-150" x2="960" y2="-150" strokeWidth="5" stroke="white"/>
        <line x1="-960" y1="150" x2="960" y2="150" strokeWidth="5" stroke="white"/>
      </g>
      <g transform="translate(0, -540)">
        <g transform="translate(0, 405)">
          <rect x="-150" y="0" width="300" height="30" fill="white" strokeWidth="0"/>
          <rect x="-150" y="40" width="300" height="30" fill="yellow" strokeWidth="0"/>
          <rect x="-150" y="80" width="300" height="30" fill="white" strokeWidth="0"/>
          <rect x="-150" y="120" width="300" height="30" fill="yellow" strokeWidth="0"/>
          <rect x="-150" y="160" width="300" height="30" fill="white" strokeWidth="0"/>
          <rect x="-150" y="200" width="300" height="30" fill="yellow" strokeWidth="0"/>
          <rect x="-150" y="240" width="300" height="30" fill="white" strokeWidth="0"/>
        </g>
      </g>
      <g transform="translate(200, 0)">
        <g transform="rotate(-90)">
          <text x="0" y="80" fill="white" fontSize="50" textAnchor="middle" letterSpacing="15">STOP</text>
          <rect x="-150" y="0" width="300" height="30" fill="white" strokeWidth="0"/>
        </g>
      </g>
      <g transform="translate(350, 0)">
        <SWGAuto/>
      </g>
      <g transform="translate(0, 150)">
        <SWGPeople/>
      </g>
      <g transform="translate(180, -210)">
        <SWGLight green/>
      </g>
    </g>
    <rect x="0" y="0" width="1920" height="1080" rx="0" fill="none" stroke="white" strokeWidth={1}/>
  </svg>
}