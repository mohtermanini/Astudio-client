class DateTimeUtils {
  removePrefixedZeros(dateString) {
    return dateString
      .split("-")
      .map((part) => Number(part).toString())
      .join("-");
  }
}

export default new DateTimeUtils();
