export const getFormattedDate = (daysToAdd: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  if (date.getDay() === 0) {
    date.setDate(date.getDate() + 1);
  }

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = dayNames[date.getDay()];

  return `${month} ${day}일 (${dayOfWeek})`;
};
