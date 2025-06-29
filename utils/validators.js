export function isEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}

export function isRequired(value) {
  return value !== null && value !== undefined && value !== '';
}

export function isPhoneNumber(value) {
  const regex = /^0[1-9](\d{2}){4}$/;
  return regex.test(value);
}
