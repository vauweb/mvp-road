/**
 *
 * @param {Number} time
 * @param {Number} count
 *
 * @return {Number[]}
 */
function generateMask(time, count) {
  const res = new Array(time).fill(0);
  for (let i = 0; i < count; i++) {
    const pos = Math.floor(Math.random() * time);
    res[pos] += 1;
  }
  return res;
}

const timeRunAuto = 2;
const timeRunPeople = 5;

/**
 * @typedef LightStatus
 * @type {object}
 * @property {('auto' | 'people' | 'wait')} type
 * @property {Number} time
 */

/**
 * @typedef OptionModel
 * @type {object}
 * @property {Number} time
 * @property {Number} countAuto
 * @property {Number} countPeople
 * @property {Number} lightTimeAuto
 * @property {Number} lightTimePeople
 * @property {Number} lightTimeChange
 * @property {('button' | 'on' | 'off')} lightMode
 */

export class Model {
  /**
   * @type {OptionModel}
   */
  opt;

  /**
   * @type {Number}
   */
  currentTime = -1;

  /**
   * @type {Number[]}
   */
  autoMask = [];

  /**
   * @type {Number[]}
   */
  peopleMask = [];

  /**
   * @type {Number}
   */
  autoQueue = 0;

  /**
   * @type {Number}
   */
  peopleQueue = 0;

  /**
   * @type {Number[]}
   */
  autoMove = [];

  /**
   * @type {Number[]}
   */
  peopleMove = [];

  /**
   * @type {Number}
   */
  tickCount = 0;

  /**
   * @type {LightStatus[]}
   */
  lightStatus = [];

  /**
   * @type {Boolean}
   */
  lightButtonPressed = false;

  /**
   *
   * @param {OptionModel} opt
   */
  constructor(opt) {
    this.opt = {...opt};
    this.reset();
  }

  lightButtonPress() {
    this.lightButtonPressed = true;
  }

  _addLightPeriod(type) {
    const time =
      type === 'auto' ? this.opt.lightTimeAuto : this.opt.lightTimePeople;
    this.lightStatus.push({type, time});
    this.lightStatus.push({type: 'wait', time: this.opt.lightTimeChange});
  }

  tick() {
    this.tickCount++;
    this.currentTime++;

    if (this.currentTime >= this.opt.time) {
      this.currentTime = 0;
    }

    if (this.currentTime === 0) {
      this.autoMask = generateMask(this.opt.time, this.opt.countAuto);
      this.peopleMask = generateMask(this.opt.time, this.opt.countPeople);
      if (this.opt.lightMode !== 'off') {
        this.lightStatus = [
          {type: 'auto', time: this.opt.lightTimeAuto},
          {type: 'wait', time: this.opt.lightTimeChange},
        ];
      }
    }

    this.peopleQueue += this.peopleMask[this.currentTime];
    this.autoQueue += this.autoMask[this.currentTime];

    if (
      this.opt.lightMode === 'button' &&
      this.peopleQueue.length &&
      !this.lightButtonPressed
    ) {
      this.lightButtonPressed = true;
    }

    if (this.opt.lightMode !== 'off') {
      const {type, time} = this.lightStatus[0];
      const buttonPressed = this.lightButtonPressed;
      const isLightModeOn = this.opt.lightMode === 'on';
      console.log({time, type, btn: this.lightButtonPressed});

      if (time <= 1) {
        if (type !== 'auto' || buttonPressed || isLightModeOn)
          this.lightStatus = this.lightStatus.slice(1);
        if (type === 'auto' && (buttonPressed || isLightModeOn)) {
          this.lightButtonPressed = false;
          this._addLightPeriod('people');
        }
        if (type === 'people') this._addLightPeriod('auto');
      }
      if (time > 1) this.lightStatus[0].time = time - 1;
    }

    if (this.peopleMove.length) {
      this.peopleMove = this.peopleMove
        .map((i) => ({...i, time: i.time - 1}))
        .filter(({time}) => time > 0);
    }

    if (this.autoMove.length) {
      this.autoMove = this.autoMove.map((i) => i - 1).filter(Boolean);
    }

    const {type, time} =
      this.opt.lightMode !== 'off' ? this.lightStatus[0] : {};

    if (
      this.peopleQueue > 0 &&
      this.autoMove.length === 0 &&
      (!type || (type === 'people' && time >= timeRunPeople))
    ) {
      this.peopleMove.push({count: this.peopleQueue, time: timeRunPeople});
      this.peopleQueue = 0; //todo: могут ли пройти сразу все одновременно?
    }

    if (
      this.autoQueue > 0 &&
      this.peopleMove.length === 0 &&
      ((!type && this.peopleQueue === 0) ||
        (type === 'auto' && time + this.opt.lightTimeChange >= timeRunAuto))
    ) {
      this.autoMove.push(timeRunAuto);
      this.autoQueue -= 1;
    }
  }

  reset() {
    this.currentTime = -1;
    this.autoMask = [];
    this.peopleMask = [];
    this.autoQueue = 0;
    this.peopleQueue = 0;
    this.autoMove = [];
    this.peopleMove = [];
    this.tickCount = 0;
  }
}
