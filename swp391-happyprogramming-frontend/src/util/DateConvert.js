export default function convertDateFormat(originalDate) {
  //2023-06-05 to 05-06-2023
  // const parts = originalDate.split("-");
  // const convertedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
  // return convertedDate;

  const date = new Date(originalDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).replace(/\//g, '-');

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`;
}
