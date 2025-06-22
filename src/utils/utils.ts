export function formatLocalizedDate(
  dateInput: string | Date,
  locale: string = "en"
): string {
  // This function formats a date to a string in the format Fri, 21 Feb 2025" - it works for any locale

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  return new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
