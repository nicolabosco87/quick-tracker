import dayjs from "dayjs";
import { TSettings } from "../state/state";
import { WindowEnhanced } from "../types";

export const minimizeWindow = () => {
  // (window as WindowEnhanced).electronAPI.minimize();
  Neutralino.window.hide();
};

export const calculateReminderMinutes = (settings: TSettings): string[] => {
  let checkHour = dayjs("2000-01-01 00:00:00");

  const minutes: string[] = [];

  while (checkHour.format("DD") === "01") {
    let inRange = false;

    settings.ranges.forEach((r) => {
      const compareHourStart = dayjs(`2000-01-01 ${r.start}:00`);
      const compareHourEnd = dayjs(`2000-01-01 ${r.end}:00`);

      if (checkHour.diff(compareHourStart) > 0 && checkHour.diff(compareHourEnd) <= 0) {
        inRange = true;
      }
    });

    if (inRange) {
      minutes.push(checkHour.format("HH:mm"));
    }

    checkHour = checkHour.add(settings.frequency, "minutes");
  }

  return minutes;
};

export const isReminderTime = (settings: TSettings) => {
  const nowTime = dayjs().format("HH:mm");

  const reminderMinutes = calculateReminderMinutes(settings);

  return reminderMinutes.includes(nowTime);
};

function randomInteger(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  const r = randomInteger(255);
  const g = randomInteger(255);
  const b = randomInteger(255);
  return [r, g, b];
}

export function randomHexColor() {
  const [r, g, b] = randomRgbColor();

  const hr = r.toString(16).padStart(2, "0");
  const hg = g.toString(16).padStart(2, "0");
  const hb = b.toString(16).padStart(2, "0");

  return "#" + hr + hg + hb;
}

export function convertTime(seconds: number) {
  // seconds = parseInt(seconds, 10);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  if (hours) {
    if (minutes) {
      return `${hours}h ${minutes}m`; //  ${seconds}s
    } else {
      return `${hours}h`; // ${seconds}s
    }
  }
  if (minutes) {
    return `${minutes}m`; // ${seconds}s
  }
  return `${seconds}s`;
}
