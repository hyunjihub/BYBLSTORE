export const getOrderNum = (): string => {
  const today = new Date();

  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const datePart = `${year}${month}${day}`;
  const randomPart = Math.floor(10000 + Math.random() * 90000);

  return `${datePart}${randomPart}`;
};
