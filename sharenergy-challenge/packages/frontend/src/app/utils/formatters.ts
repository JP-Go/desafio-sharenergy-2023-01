export function formatPhoneString(phoneString: string) {
  const dddCode = phoneString.slice(0, 2);
  const firstDigits = phoneString.slice(2, 7);
  const lastDigits = phoneString.slice(7, phoneString.length);
  return `(${dddCode})${firstDigits}-${lastDigits}`;
}

export function formatCpfString(cpfString: string) {
  const firstTrio = cpfString.slice(0, 3);
  const secondTrio = cpfString.slice(3, 6);
  const thirdTrio = cpfString.slice(6, 9);
  const verifiers = cpfString.slice(9, 12);
  return `${firstTrio}.${secondTrio}.${thirdTrio}-${verifiers}`;
}

export function formatCepString(cepString: string) {
  const sector = cepString.slice(0, 5);
  const distribution = cepString.slice(5, cepString.length);
  return `${sector}-${distribution}`;
}
