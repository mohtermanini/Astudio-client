class StringUtils {
  convertStringToBoolean = (stringValue: any): boolean => {
    if (typeof stringValue === "boolean") return stringValue;
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
      case undefined:
        return false;
      default:
        return JSON.parse(stringValue);
    }
  };

  camelToFlat = (camel: string): string => {
    const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    let flat = "";
    camelCase.forEach((word) => {
      flat += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    });
    return flat.trim();
  };

  isEmpty = (string: string): boolean => {
    return string.length === 0;
  };
}

export default new StringUtils();
