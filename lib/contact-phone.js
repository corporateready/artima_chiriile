const PROJECT_FALLBACK_PHONE = "+37376040824";

export function normalizeContactPhone(value) {
  const digits = value?.replace(/\D/g, "") ?? "";

  if (!digits) return PROJECT_FALLBACK_PHONE;

  if (digits.length === 9 && digits.startsWith("0")) {
    return `+373${digits.slice(1)}`;
  }

  if (digits.length === 8) return `+373${digits}`;

  return `+${digits}`;
}

export function formatContactPhone(value) {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 11 && digits.startsWith("373")) {
    return `+373 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }

  return value;
}

export const FALLBACK_PHONE_NUMBER = normalizeContactPhone(
  process.env.NEXT_PUBLIC_FALLBACK_PHONE,
);

export const FALLBACK_PHONE_HREF = `tel:${FALLBACK_PHONE_NUMBER}`;

export const FALLBACK_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_FALLBACK_PHONE_DISPLAY?.trim() ||
  formatContactPhone(FALLBACK_PHONE_NUMBER);
