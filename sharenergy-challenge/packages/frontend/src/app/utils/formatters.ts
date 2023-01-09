export function formatPhoneString(phoneString: string) {
  const dddCode = phoneString.slice(0, 2);
  const firstDigits = phoneString.slice(2, 7);
  const lastDigits = phoneString.slice(7, phoneString.length);
  return `(${dddCode}) ${firstDigits}-${lastDigits} `;
}

export function formatCpfString(cpfString: string) {
  const firstDigits = cpfString
    .slice(0, 9)
    .split(/(\d\d\d)/)
    .filter((group) => group !== '')
    .join('.');
  const verifiers = cpfString.slice(9, 12);
  return `${firstDigits}-${verifiers}`;
}
