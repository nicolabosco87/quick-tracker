export const localeDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};
