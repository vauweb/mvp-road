import React, {useCallback, useMemo, useState} from "react";
import {SWGAuto} from "./SWGAuto";
import {SWGPeople} from "./SWGPeople";
import './style.css';
import {SWGLight} from "./SWGLight";

const animationTime = 1000;

export function RoadModel() {
    const [peopleQueue, setPeopleQueue] = useState(40);
    const [peopleMove, setPeopleMove] = useState(0);
    const [autoQueue, setAutoQueue] = useState(10);
    const [autoMove, setAutoMove] = useState(0);
    const [lightStatus, setLightStatus] = useState('wait')

    const testP = useCallback(() => {
        setPeopleMove(p => p + 3);
        setPeopleQueue(p => p);
        setLightStatus(p => p);
        // setPeopleQueue(p => Math.max(0, p - 3));
        setTimeout(() => {
            setPeopleMove(p => Math.max(0, p - 3));
        }, animationTime);
    }, [])

    const testA = useCallback(() => {
        setAutoMove(p => p + 1);
        setAutoQueue(p => p);
        // setAutoQueue(p => Math.max(0, p - 1));
        setTimeout(() => {
            setAutoMove(p => Math.max(0, p - 1));
        }, animationTime);
    }, [])

    /**
     * @type {Boolean[]}
     */
    const peopleQueueArr = useMemo(() => {
        return new Array(Math.min(20, peopleQueue + peopleMove)).fill(false).map((p, i) => {
            return i < peopleMove
        });
    }, [peopleQueue, peopleMove])

    /**
     * @type {Boolean[]}
     */
    const autoQueueArr = useMemo(() => {
        return new Array(Math.min(2, autoQueue + autoMove)).fill(false).map((p, i) => {
            return i < autoMove
        });
    }, [autoQueue, autoMove])

    return <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080" style={{
        width: '100%', height: '100%', maxWidth: '100vw',
        maxHeight: '100vh',
        '--speed-walk': `${animationTime}ms`
    }}>
        <defs>
            <clipPath id="screen">
                <rect x="0" y="0" width="1920" height="1080" rx="0" fill="none" stroke="white" strokeWidth={1}/>
            </clipPath>
        </defs>
        <g clipPath="url(#screen)">
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
                <g onClick={testP}>
                    {peopleQueueArr.map((p, i) => {
                        return <g key={i}
                                  transform={`translate(${-100 + ((i % 3) * 100)}, ${180 + (Math.floor(i / 3) * 50)})`}>
                            <SWGPeople status={p ? 'walk' : 'idle'}/>
                        </g>
                    })}

                    {peopleQueueArr.length < peopleQueue + peopleMove &&
                        <g transform={`translate(${100}, ${180 + (6 * 50)})`}>
                            <text x="0" y="15" fill="white" fontSize="40" textAnchor="middle"
                                  letterSpacing="0">+{peopleQueue + peopleMove - peopleQueueArr.length}</text>
                        </g>
                    }
                </g>
                <g onClick={testA}>
                    {autoQueueArr.map((a, i) => {
                        return <g key={i} transform={`translate(${290 + (i * 530)}, 0)`}>
                            <SWGAuto status={a ? 'run' : 'idle'}/>
                        </g>
                    })}

                    {autoQueueArr.length < autoQueue &&
                        <g transform={`translate(${880}, 0)`}>
                            <text x="0" y="15" fill="white" fontSize="40" textAnchor="middle"
                                  letterSpacing="0">+{autoQueue - autoQueueArr.length}</text>
                        </g>
                    }
                </g>

                <g transform="translate(180, -210)">
                    <SWGLight green={lightStatus === 'people'} red={lightStatus === 'auto'}
                              yellow={lightStatus === 'wait'}/>
                </g>
            </g>
        </g>

    </svg>
}