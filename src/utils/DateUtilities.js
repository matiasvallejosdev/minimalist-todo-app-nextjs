
export function getDateStatus(inputDateStr) {
  // Parse the input date string
  const date = new Date(inputDateStr);
  
  // Extract the month, day, and year
  const day = (date.getMonth() + 1).toString().padStart(2, '0');
  const month = (date.getDate() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  // Format the date string
  const formattedDate = `${month}-${day}-${year}`;
  
  return formattedDate;
}
