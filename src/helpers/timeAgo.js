import { mayAddS } from './mayAddS';

export const timeAgo = (dateParam) => {
  if (!dateParam) {
    return null;
  }

  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);

  if (seconds < 5) {
    return 'a few seconds ago';
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${mayAddS(minutes)} ago`;
  } else if (hours < 24) {
    return `${hours} hour${mayAddS(hours)} ago`;
  } else if (days < 7) {
    return `${days} day${mayAddS(days)} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${mayAddS(weeks)} ago`;
  } else if (months < 12) {
    return `${months} month${mayAddS(months)} ago`;
  }

  return `${years} year${mayAddS(years)} ago`;
};
