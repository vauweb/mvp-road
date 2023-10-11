import React from "react";
import cn from 'classnames'

/**
 *
 * @param {string} color
 * @param {string} head
 * @param {('idle','walk')} status
 * @return {Element}
 * @constructor
 */
export function SWGPeople({color = "#9fda0a", head = "#000000", status = 'idle'}) {
  return <g className={cn(`people_${status}`)}>
    <g className={cn('people_leg')}>
      <circle cx="-15" cy="-15" r="10" fill={color} stroke="black" strokeWidth="1"/>
      <circle cx="15" cy="15" r="10" fill={color} stroke="black" strokeWidth="1"/>
    </g>
    <g transform="scale(1, 0.4)">
      <circle cx="0" cy="0" r="40" fill={color} stroke="black" strokeWidth="1"/>
    </g>


    <circle cx="0" cy="0" r="18" fill={head} stroke="black" strokeWidth="1"/>
  </g>
}