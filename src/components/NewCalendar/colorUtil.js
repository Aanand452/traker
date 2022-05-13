
export const getColor = (category) => {
  switch (category) {
    case "Event":
      return "ff8989";
    case "Campaign":
      return "ffd89c";
    case "Exec Engagement":
      return "a2c0f3";
    case "Digital":
      return "c0dcb3";
    case "Webinar":
      return "b1ced2";
    case "SIC":
      return "d5acf0";
    case "Content":
      return "f298f2";
    default:
      return "c0dcb3";
  }
}
