
export default function convertDateFormat(originalDate) {
    //2023-06-05 to 05-06-2023
    const parts = originalDate.split("-");
    const convertedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return convertedDate;
  }