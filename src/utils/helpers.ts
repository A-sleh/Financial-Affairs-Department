export function getCurrentDate() {
  // Get the current date
  const today = new Date();

  // Get the year, month, and day
  const year = today.getFullYear();
  // getMonth() returns a zero-based index (0-11), so add 1
  let month: any = today.getMonth() + 1;
  let day: any = today.getDate();

  // Add leading zeros if the month or day is a single digit
  if (month < 10) {
    month = "0" + month.toString();
  }
  if (day < 10) {
    day = "0" + day.toString();
  }

  // Format the date as "YYYY-MM-DD" for the input value
  const formattedDate = `${year}-${month}-${day}`;

  // Set the value of the input element
  return formattedDate;
}

const convertToArabicDigits = (num: string) => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return String(num).replace(/\d/g, (d) => arabicDigits[Number(d)]);
};

export const formatNumberWithSpaces = (value: string) => {
  const cleanValue = value.replace(/\s+/g, "").replace(/\D/g, "");
  const formatted = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertToArabicDigits(formatted);
};
