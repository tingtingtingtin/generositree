export const formatDate = (timestamp) => {
  const NOW = new Date();
  if (!timestamp) return "Invalid Date";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  // const options = { year: "numeric", month: "long", day: "numeric" };
  const secondsAgo = Math.floor((NOW.getTime() - date.getTime()) / 1000);
  if (secondsAgo < 60) return "now";
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo} min ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hr ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 30) return `${daysAgo} days ago`;
  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12) return `${monthsAgo} months ago`;
  const yearsAgo = Math.floor(monthsAgo / 12);
  return `${yearsAgo} years ago`;
};
