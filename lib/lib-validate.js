import {
  defaultCountries,
  parseCountry,
  buildCountryData,
} from "react-international-phone";

export const CUSTOM_COUNTRY_FORMATS = {
  md: "(..)-...-...",
  ro: "(...)-...-...",
};

export const DEFAULT_LOCAL_MASK = "... ... ... ...";

export function onlyDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function getCountryMask(country) {
  const customFormat = CUSTOM_COUNTRY_FORMATS[country.iso2];

  if (customFormat) return customFormat;

  const format = country.format;

  if (typeof format === "string") {
    return format;
  }

  if (format && typeof format === "object" && format.default) {
    return format.default;
  }

  return DEFAULT_LOCAL_MASK;
}

export const phoneCountries = defaultCountries.map((country) => {
  const parsedCountry = parseCountry(country);

  const customFormat = CUSTOM_COUNTRY_FORMATS[parsedCountry.iso2];

  if (!customFormat) {
    return country;
  }

  return buildCountryData({
    ...parsedCountry,
    format: customFormat,
  });
});

export function getMaxLocalDigits(country) {
  const mask = getCountryMask(country);

  return (mask.match(/\./g) ?? []).length;
}

export function normalizeLocalDigits(inputValue, country) {
  const dialCode = onlyDigits(country.dialCode);

  let digits = onlyDigits(inputValue);

  // Если вставили полный номер: +40712345678 / 40712345678
  if (digits.startsWith(dialCode)) {
    digits = digits.slice(dialCode.length);
  }

  if (country.iso2 === "md" || country.iso2 === "ro") {
    digits = digits.replace(/^0+/, "");
  }

  return digits.slice(0, getMaxLocalDigits(country));
}

export function buildPhoneValue(country, localDigits) {
  if (!localDigits) return "";

  return `+${country.dialCode}${localDigits}`;
}

export function maskToPlaceholder(mask) {
  return mask.replace(/\./g, "X");
}
