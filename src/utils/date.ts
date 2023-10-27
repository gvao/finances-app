export const FormatDate = (
	date?: Date | string | number,
	options: Intl.DateTimeFormatOptions | undefined = {},
	locales = "pt-Br"
) => {
  if(!date) return null

  if(typeof date === 'string' || typeof date === 'number') date = new Date(date)

  return new Intl.DateTimeFormat(locales, options).format(new Date(date));
}
