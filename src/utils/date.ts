export const transformDate = (date: Date, locales = "pt-Br") =>
  new Intl.DateTimeFormat(locales, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));

