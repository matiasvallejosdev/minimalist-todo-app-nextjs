export function getRelativeDate(option) {
  const today = new Date();
  let resultDate;

  switch (option) {
    case 'today':
      resultDate = today;
      break;
    case 'tomorrow':
      resultDate = new Date(today);
      resultDate.setDate(today.getDate() + 1);
      break;
    case 'next_week':
      resultDate = new Date(today);
      resultDate.setDate(today.getDate() + 7);
      break;
    default:
      throw new Error('Invalid option. Please choose "tomorrow", "today", or "next_week".');
  }

  return resultDate;
}

export function getRelativeDayString(date) {
  const today = new Date();
  const inputDate = new Date(date);

  // Clear the time part of both dates for accurate comparison
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const timeDifference = inputDate - today;
  const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (dayDifference === 0) {
    return 'Today';
  } else if (dayDifference === 1) {
    return 'Tomorrow';
  } else if (dayDifference === 7) {
    return 'Next Week';
  } else if (dayDifference < 0) {
    // If the date is in the past
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  } else {
    // For future dates that are not 'Tomorrow' or 'Next Week'
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return inputDate.toLocaleDateString('en-US', options);
  }
}
