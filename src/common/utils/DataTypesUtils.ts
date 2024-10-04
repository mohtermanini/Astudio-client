class DataTypesUtils {
  isDefined<T>(value: T): boolean {
    return value !== null && value !== undefined;
  }
}

export default new DataTypesUtils();
