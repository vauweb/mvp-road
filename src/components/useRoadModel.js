import { useState, useEffect } from 'react'
import { Model } from '../model/model'

const _defaultModelConfig = {
  time: 1800,
  countAuto: 600,
  countPeople: 1000,
  lightTimeAuto: 30,
  lightTimePeople: 20,
  lightTimeChange: 3,
  lightMode: 'on'
}

/**
 *
 * @return {Object}
 * @function
 */
export function useRoadModel() {
  const [model] = useState(new Model(_defaultModelConfig));
  const [data, setData] = useState({
    autoQueue: 0,
    peopleQueue: 0,
    lightStatus: 'wait'
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      model.tick();

      console.log(model.lightStatus[0])

      setData({
        autoQueue: model.autoQueue ?? 0,
        peopleQueue: model.peopleQueue ?? 0,
        lightStatus: model.lightStatus[0]?.type ?? 'wait'
      })
    }, 1000);
    return () => clearInterval(intervalId);
  }, [model]);

  return data;
}
