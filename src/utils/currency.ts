export const transformCurrency = (
  value: number,
  options: Intl.NumberFormatOptions,
  locales: string = "pt-Br"
) =>
  new Intl.NumberFormat(locales, {
    currency: "BRL",
    compactDisplay: "long",
    minimumFractionDigits: 2,
    ...options,
  }).format(value);
