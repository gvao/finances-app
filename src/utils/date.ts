export const transformDate = (
	date: Date,
	options: Intl.DateTimeFormatOptions | undefined = {},
	locales = "pt-Br"
) => {
  if(!date) return null

  return new Intl.DateTimeFormat(locales, options).format(new Date(date));
}
