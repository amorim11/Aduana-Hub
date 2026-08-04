/**
 * Progressive input masks for the Brazilian customs document numbers used
 * across the app. Both apply digits-only as the user types and insert the
 * literal separators once enough digits exist for them to make sense.
 */

/** DTA and DI share the same format: "25/0000000-1" (10 digits total). */
export function maskDtaOrDi(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 10);
  const year = digits.slice(0, 2);
  const sequence = digits.slice(2, 9);
  const check = digits.slice(9, 10);

  let formatted = year;
  if (digits.length > 2) formatted += `/${sequence}`;
  if (digits.length > 9) formatted += `-${check}`;
  return formatted;
}

/** DUIMP format: "26BR0000123456-7" (13 digits total, "BR" literal). */
export function maskDuimp(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 13);
  const year = digits.slice(0, 2);
  const sequence = digits.slice(2, 12);
  const check = digits.slice(12, 13);

  let formatted = year;
  if (digits.length > 2) formatted += `BR${sequence}`;
  if (digits.length > 12) formatted += `-${check}`;
  return formatted;
}
