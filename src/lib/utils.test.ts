import { PopupPosition, Settings } from "../state/types";
import { calculateReminderMinutes } from "./utils";

describe("Check schedules", () => {
  it("Should create a schedule", () => {
    const settings: Settings = {
      frequency: 15,
      maxSuggestions: 6,
      ranges: [
        {
          start: "10:00",
          end: "13:00",
        },
      ],
      activeDays: [],
      popupPosition: PopupPosition.TopLeft,
      temporaryDisabled: false,
    };

    const minutes = calculateReminderMinutes(settings);

    expect(minutes.includes("10:00")).toBeFalsy();
    expect(minutes.includes("10:15")).toBeTruthy();
    expect(minutes.includes("10:30")).toBeTruthy();
    expect(minutes.includes("10:45")).toBeTruthy();
    expect(minutes.includes("13:00")).toBeTruthy();
    expect(minutes.includes("13:15")).toBeFalsy();
    expect(minutes.length).toBe(12);
  });

  it("Should create a composed schedule", () => {
    const settings: Settings = {
      frequency: 30,
      maxSuggestions: 6,
      ranges: [
        {
          start: "09:00",
          end: "13:00",
        },
        {
          start: "14:00",
          end: "18:00",
        },
      ],
      activeDays: [],
      popupPosition: PopupPosition.TopLeft,
      temporaryDisabled: false,
    };

    const minutes = calculateReminderMinutes(settings);

    expect(minutes.includes("08:00")).toBeFalsy();
    expect(minutes.includes("09:00")).toBeFalsy();
    expect(minutes.includes("09:30")).toBeTruthy();
    expect(minutes.includes("13:00")).toBeTruthy();
    expect(minutes.includes("13:30")).toBeFalsy();
    expect(minutes.includes("14:00")).toBeFalsy();
    expect(minutes.includes("14:30")).toBeTruthy();
    expect(minutes.includes("18:00")).toBeTruthy();
    expect(minutes.includes("18:30")).toBeFalsy();
    expect(minutes.length).toBe(16);
  });
});
